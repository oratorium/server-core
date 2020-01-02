import { GraphQLInputFieldConfigMap, GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

export const createWhereInput = (name: string, fields: GraphQLInputFieldConfigMap) => {
  const OrOperator = new GraphQLInputObjectType({ name: `${name}OrOperator`, fields });
  const Operator = new GraphQLInputObjectType({
    name: `${name}Operator`,
    fields: {
      ...fields,
      or: {
        type: new GraphQLList(new GraphQLNonNull(OrOperator))
      }
    }
  });
  return Operator;
};
