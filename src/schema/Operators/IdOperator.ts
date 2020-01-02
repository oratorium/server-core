import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLID;

export const IdOperator = createWhereInput("Id", {
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
