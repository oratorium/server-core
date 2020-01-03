import { GraphQLInputFieldConfigMap, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLBoolean } from "graphql";

export const createWhereInput = (
  name: string,
  fields: GraphQLInputFieldConfigMap,
  { isNullable }: { isNullable: boolean } = { isNullable: false }
) => {
  if (isNullable) {
    Object.assign(fields, { isNull: { type: GraphQLBoolean } });
  }
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
