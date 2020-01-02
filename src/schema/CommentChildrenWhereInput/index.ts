import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator } from "../DateTimeOperator";

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

const CommentOrChildrenWhereInput = new GraphQLInputObjectType({
  name: "CommentChildrenOrWhereInput",
  fields: createOperator()
});

export const CommentChildrenWhereInput = new GraphQLInputObjectType({
  name: "CommentChildrenWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(CommentOrChildrenWhereInput))
    }
  }
});
