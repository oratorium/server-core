import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTime } from "../DateTime";

const Scalar = DateTime;

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

const DateTimeOrOperator = new GraphQLInputObjectType({
  name: "DateTimeOrOperator",
  fields: createOperator()
});

export const DateTimeOperator = new GraphQLInputObjectType({
  name: "DateTimeOperator",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DateTimeOrOperator))
    }
  }
});
