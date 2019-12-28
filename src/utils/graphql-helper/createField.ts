import { GraphQLFieldConfig } from "graphql";

import { Context } from "../../context";

export const createField = <TSource = any, TArgs = { [argName: string]: any }>(field: GraphQLFieldConfig<TSource, Context, TArgs>) =>
  field as GraphQLFieldConfig<any, any, any>;
