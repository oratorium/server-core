import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const DocumentFragment = new GraphQLObjectType({
  name: "DocumentFragment",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    documentId: {
      type: GraphQLNonNull(GraphQLID)
    },
    order: {
      type: GraphQLNonNull(GraphQLInt)
    },
    type: {
      type: GraphQLNonNull(GraphQLString)
    },
    isOptional: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    value: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});
