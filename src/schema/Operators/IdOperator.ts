import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import { createWhereInput } from "../../utils/graphql-helper";

const Scalar = GraphQLID;

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
  startsWith: {
    type: Scalar
  },
  endsWith: {
    type: Scalar
  },
  contains: {
    type: Scalar
  }
};

export const IdOperator = createWhereInput("Id", fields);

export const NullableIdOperator = createWhereInput("Id", fields, { isNullable: true });
