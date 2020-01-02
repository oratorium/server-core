import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLString;

export const StringOperator = createWhereInput("String", {
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
  startsWith: {
    type: Scalar
  },
  endsWith: {
    type: Scalar
  },
  contains: {
    type: Scalar
  }
});
