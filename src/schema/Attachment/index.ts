import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const Attachment = new GraphQLObjectType({
  name: "Attachment",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    commentId: {
      type: GraphQLNonNull(GraphQLID)
    },
    type: {
      type: GraphQLNonNull(GraphQLString)
    },
    value: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});
