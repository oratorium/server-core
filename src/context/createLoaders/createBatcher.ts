import { getRepository, In, ObjectType } from "typeorm";

export const createBatcher = <Entity>(repository: ObjectType<Entity>, getKey: (item: Entity) => number | string) => {
  const batcher = async (idList: readonly number[]) => {
    const itemList = await getRepository(repository).find({ where: { id: In(idList as number[]) } });
    const itemMap = new Map(itemList.map(item => [getKey(item), item]));
    return idList.map(id => itemMap.get(id) ?? null);
  };
  return batcher;
};
