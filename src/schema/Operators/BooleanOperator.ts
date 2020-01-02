import { GraphQLBoolean } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLBoolean;

export const BooleanOperator = createWhereInput("Boolean", {
  eq: {
    type: Scalar
  },
  notEq: {
    type: Scalar
  }
});
