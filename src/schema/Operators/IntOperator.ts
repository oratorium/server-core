import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLInt;

export const IntOperator = createWhereInput("Int", {
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
