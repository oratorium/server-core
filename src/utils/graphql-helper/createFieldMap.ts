import { GraphQLFieldConfigMap } from "graphql";

import { Context } from "../../context";

export const createFieldMap = <TSource = any, TArgs = { [argName: string]: any }>(
  fieldMap: GraphQLFieldConfigMap<TSource, Context, TArgs> | (() => GraphQLFieldConfigMap<TSource, Context, TArgs>)
) => fieldMap as GraphQLFieldConfigMap<any, any, any> | (() => GraphQLFieldConfigMap<any, any, any>);
