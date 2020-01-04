import DataLoader from "dataloader";
import { getConnection } from "typeorm";

type Parameter = any;

type Option = {
  query: string;
  parameterList: Parameter[];
};

const reduceArgument = (option: Option, { query, parameterList }: Option) => {
  option.query += query;
  option.query += ";";
  option.parameterList.push(...parameterList);
  return option;
};

const batchQuery = async (optionList: readonly Option[]): Promise<any[]> => {
  const { query, parameterList } = optionList.reduce(reduceArgument, { query: "", parameterList: [] });
  const itemList = await getConnection().query(query, parameterList);
  return optionList.length === 1 ? [itemList] : itemList;
};

const loader = new DataLoader(batchQuery, { cache: false });

export const load = async <T>(query: string, parameterList: Parameter[] = []) => {
  const itemList = await loader.load({ query, parameterList });
  return (itemList[0] as T) || null;
};

export const loadMany = async <T>(query: string, parameterList: Parameter[] = []) => {
  const itemList = await loader.load({ query, parameterList });
  return itemList as T[];
};
