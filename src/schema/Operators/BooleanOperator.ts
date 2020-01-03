import { GraphQLBoolean } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLBoolean;

const fields = {
  eq: {
    type: Scalar
  },
  notEq: {
    type: Scalar
  }
};

export const BooleanOperator = createWhereInput("Boolean", fields);

export const NullableBooleanOperator = createWhereInput("Boolean", fields, { isNullable: true });
