import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { DateTime } from "../Scalars/DateTime";
import { attachments } from "./attachments";
import { comments } from "./comments";
import { author } from "./author";

export const Comment = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: GraphQLNonNull(GraphQLID)
    },
    parentId: {
      type: GraphQLNonNull(GraphQLID)
    },
    depth: {
      type: GraphQLNonNull(GraphQLInt)
    },
    order: {
      type: GraphQLNonNull(GraphQLInt)
    },
    text: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    },
    updatedAt: {
      type: GraphQLNonNull(DateTime)
    },
    deletedAt: {
      type: DateTime
    },
    attachments,
    comments: comments(Comment),
    author
  })
});
