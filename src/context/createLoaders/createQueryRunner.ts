import DataLoader from "dataloader";
import { getConnection } from "typeorm";

export const createQueryRunner = () => {
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
