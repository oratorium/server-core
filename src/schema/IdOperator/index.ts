import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

const Scalar = GraphQLID;

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

const IdOrOperator = new GraphQLInputObjectType({
  name: "IdOrOperator",
  fields: { ...createOperator() }
});

export const IdOperator = new GraphQLInputObjectType({
  name: "IdOperator",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(IdOrOperator))
    }
  }
});
