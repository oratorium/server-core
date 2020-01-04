import { Brackets } from "typeorm";

type Where<T = string> = T & {
  readonly or?: T | T[];
};

type Alias = Record<string, string>;

export const createBracket = (where: Where<any> = {}, alias: Alias = {}) =>
  new Brackets(queryBuilder => {
    const hash = createHashGenerator();
    const { or = [], ...andWhere } = where;
    let isInitialized = false;
    for (const [name, operatorAndValue] of Object.entries<string>(andWhere)) {
      for (const opVal of array<string>(operatorAndValue)) {
        for (const [operator, value] of Object.entries(opVal)) {
          isInitialized = true;
          const [op, parameter] = operators[operator](hash(), value);
          queryBuilder.andWhere(`\`${alias[name] || name}\` ${op}`, parameter);
        }
      }
    }
    for (const orWhere of array(or)) {
      queryBuilder.orWhere(
        new Brackets(queryBuilder => {
          for (const [name, operatorAndValue] of Object.entries<string>(orWhere)) {
            for (const opVal of array<string>(operatorAndValue)) {
              for (const [operator, value] of Object.entries(opVal)) {
                isInitialized = true;
                const [op, parameter] = operators[operator](hash(), value);
                queryBuilder.andWhere(`\`${alias[name] || name}\` ${op}`, parameter);
              }
            }
          }
        })
      );
    }
    if (!isInitialized) {
      throw new Error("설정한 조건이 없습니다");
    }
  });

const array = <T>(value: T): readonly T[] => (Array.isArray(value) ? value : [value]);

const TOKEN_LIST = "abcdefghijklmnopqrstuvwxyz";

const createHashGenerator = (count = -1) => () =>
  (++count)
    .toString(TOKEN_LIST.length)
    .split("")
    .map(index => TOKEN_LIST[index])
    .join("");

const operators = {
  eq: (key: string, value: any) => [`= :${key}`, { [key]: value }],
  notEq: (key: string, value: any) => [`!= :${key}`, { [key]: value }],
  gt: (key: string, value: any) => [`> :${key}`, { [key]: value }],
  gte: (key: string, value: any) => [`>= :${key}`, { [key]: value }],
  lt: (key: string, value: any) => [`< :${key}`, { [key]: value }],
  lte: (key: string, value: any) => [`<= :${key}`, { [key]: value }],
  startsWith: (key: string, value: any) => [`LIKE :${key}`, { [key]: `${value}%` }],
  endsWith: (key: string, value: any) => [`LIKE :${key}`, { [key]: `%${value}` }],
  contains: (key: string, value: any) => [`LIKE :${key}`, { [key]: `%${value}%` }],
  in: (key: string, value: any) => [`IN :${key}`, { [key]: value }],
  notIn: (key: string, value: any) => [`NOT IN :${key}`, { [key]: value }],
  exists: (key: string, value: any) => [`EXISTS :${key}`, { [key]: value }],
  notExists: (key: string, value: any) => [`NOT EXISTS :${key}`, { [key]: value }],
  between: (key: string, [start, end]: any) => [`BETWEEN :${key}_start AND :${key}_end`, { [`${key}_start`]: start, [`${key}_end`]: end }],
  notBetween: (key: string, [start, end]: any) => [
    `BETWEEN :${key}_start AND :${key}_end`,
    { [`${key}_start`]: start, [`${key}_end`]: end }
  ],
  isNull: (key: string, value: boolean) => [value ? "IS NULL" : "IS NOT NULL"]
};
