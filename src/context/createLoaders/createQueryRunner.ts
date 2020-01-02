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
    const result = await getConnection().query(query, parameterList);
    const resultList: any[] = argumentList.length === 1 ? [result] : result;
    return argumentList.map(({ isArray }, index) => {
      const result = resultList[index];
      return isArray ? result : result[0];
    });
  };
  const loader = new DataLoader(batchQuery, { cache: false });

  function load<T>(argument: ArrayOption): Promise<readonly T[]>;
  function load<T>(argument: Option): Promise<T>;
  function load(argument: any) {
    return loader.load(argument);
  }

  return { load };
};
