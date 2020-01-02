import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

const Scalar = GraphQLString;

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

const StringOrOperator = new GraphQLInputObjectType({
  name: "StringOrOperator",
  fields: createOperator()
});

export const StringOperator = new GraphQLInputObjectType({
  name: "StringOperator",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(StringOrOperator))
    }
  }
});
