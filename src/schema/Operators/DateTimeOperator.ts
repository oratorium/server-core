import { GraphQLList, GraphQLNonNull } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";

const Scalar = DateTime;

const fields = {
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
};

export const DateTimeOperator = createWhereInput("DateTime", fields);

export const NullableDateTimeOperator = createWhereInput("NullableDateTime", fields, { isNullable: true });
