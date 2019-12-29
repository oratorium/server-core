import DataLoader from "dataloader";
import { getConnection, getRepository, In } from "typeorm";

import { UserRepository } from "../repositories/User";

export type Context = ReturnType<typeof createContext>;

export const createContext = () => ({ loaders: createLoaders() });

const createLoaders = () => ({
  query: createQueryRunner(),
  user: new DataLoader(userBatcher)
});

const createQueryRunner = () => {
  type Parameter = any;
  type Option = {
    query: string;
    parameterList?: Parameter[];
    isArray?: boolean;
  };

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

  return {
    load<T>(argument: Option) {
      return loader.load(argument) as Promise<T>;
    }
  };
};

const userBatcher = async (idList: readonly number[]) => {
  const userList = await getRepository(UserRepository).find({ where: { id: In(idList as number[]) } });
  const userMap = new Map(userList.map(user => [user.id, user]));
  return idList.map(userMap.get);
};
