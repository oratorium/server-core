import DataLoader from "dataloader";
import { getConnection, getRepository, In, EntitySchema, ObjectType } from "typeorm";

import { UserRepository } from "../repositories/User";
import { PreferenceRepository } from "../repositories/Preference";

export type Context = ReturnType<typeof createContext>;

export const createContext = () => ({ loaders: createLoaders() });

const createLoaders = () => ({
  preference: new DataLoader(createBatcher(PreferenceRepository, item => item.id)),
  query: createQueryRunner(),
  user: new DataLoader(createBatcher(UserRepository, item => item.id))
});

const createBatcher = <Entity>(repository: ObjectType<Entity>, getKey: (item: Entity) => number | string) => {
  const batcher = async (idList: readonly number[]) => {
    const itemList = await getRepository(repository).find({ where: { id: In(idList as number[]) } });
    const itemMap = new Map(itemList.map(item => [getKey(item), item]));
    return idList.map(id => itemMap.get(id) ?? null);
  };
  return batcher;
};

const createQueryRunner = () => {
  type Parameter = any;
  type Option = {
    query: string;
    parameterList?: Parameter[];
    isArray?: boolean;
  };

  type ArrayOption = Option & { isArray: true };

  const batchQuery = async (argumentList: readonly Option[]) => {
    type Argument = {
      query: string;
      parameterList: Parameter[];
    };
    const reduceArgument = (argument: Argument, { query, parameterList = [] }: Option) => {
      argument.query += query;
      argument.query += ";";
      argument.parameterList.push(...parameterList);
      return argument;
    };
    const { query, parameterList } = argumentList.reduce(reduceArgument, { query: "", parameterList: [] });
    const resultList = await getConnection().query(query, parameterList);
    return argumentList.map(({ isArray }, index) => {
      const result = resultList[index];
      if (!isArray) {
        return result;
      }
      if (!result) {
        return [];
      }
      if (Array.isArray(result)) {
        return result;
      }
      return [result];
    });
  };
  const loader = new DataLoader(batchQuery, { cache: false });

  function load<T>(argument: ArrayOption): Promise<readonly T[]>;
  function load<T>(argument: Option): Promise<T>;
  function load<T>(argument: ArrayOption | Option): any {
    return loader.load(argument);
  }

  return { load };
};
