import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator } from "../../DateTimeOperator";

const createOperator = () => ({
  createdAt: {
    type: DateTimeOperator
  },
  updatedAt: {
    type: DateTimeOperator
  },
  deletedAt: {
    type: DateTimeOperator
  }
});

const CommentOnCommentOrWhereInput = new GraphQLInputObjectType({
  name: "CommentOnCommentOrWhereInput",
  fields: createOperator()
});

export const CommentOnCommentWhereInput = new GraphQLInputObjectType({
  name: "CommentOnCommentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(CommentOnCommentOrWhereInput))
    }
  }
});
