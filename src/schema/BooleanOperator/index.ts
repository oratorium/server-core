import { GraphQLInputObjectType, GraphQLBoolean, GraphQLList, GraphQLNonNull } from "graphql";

const Scalar = GraphQLBoolean;

const createOperator = () => ({
  eq: {
    type: Scalar
  },
  notEq: {
    type: Scalar
  }
});

const BooleanOrOperator = new GraphQLInputObjectType({
  name: "BooleanOrOperator",
  fields: createOperator()
});

export const BooleanOperator = new GraphQLInputObjectType({
  name: "BooleanOperator",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(BooleanOrOperator))
    }
  }
});
