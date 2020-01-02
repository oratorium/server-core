import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

const Scalar = GraphQLInt;

const createOperator = () => ({
  eq: {
    type: Scalar
  },
  notEq: {
    type: Scalar
  },
  in: {
    type: new GraphQLList(new GraphQLNonNull(Scalar))
  },
  notIn: {
    type: new GraphQLList(new GraphQLNonNull(Scalar))
  },
  gt: {
    type: Scalar
  },
  gte: {
    type: Scalar
  },
  lt: {
    type: Scalar
  },
  lte: {
    type: Scalar
  },
  between: {
    type: new GraphQLList(new GraphQLNonNull(Scalar))
  },
  notBeetween: {
    type: new GraphQLList(new GraphQLNonNull(Scalar))
  }
});

const IntOrOperator = new GraphQLInputObjectType({
  name: "IntOrOperator",
  fields: createOperator()
});

export const IntOperator = new GraphQLInputObjectType({
  name: "IntOperator",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(IntOrOperator))
    }
  }
});
