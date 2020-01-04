import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { CommentRepository } from "../../repositories/Comment";
import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";
import { attachments } from "./attachments";
import { author } from "./author";
import { comments } from "./comments";
import { hashtags } from "./hashtags";

export const Comment = new GraphQLObjectType({
  name: "Comment",
  fields: createFieldMap<CommentRepository>(() => ({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: GraphQLNonNull(GraphQLID)
    },
    parentId: {
      type: GraphQLID
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
    isDeleted: {
      type: GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context, info) {
        return !!parent.deletedAt;
      }
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
    author,
    comments: comments(Comment),
    hashtags
  }))
});
