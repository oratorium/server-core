import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator, IdOperator, IntOperator, StringOperator } from "../../Operators";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  userId: {
    type: IdOperator
  },
  parentId: {
    type: IdOperator
  },
  depth: {
    type: IntOperator
  },
  order: {
    type: IntOperator
  },
  value: {
    type: StringOperator
  },
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

const CommentOrWhereInput = new GraphQLInputObjectType({
  name: "CommentOrWhereInput",
  fields: createOperator()
});

export const CommentWhereInput = new GraphQLInputObjectType({
  name: "CommentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(CommentOrWhereInput))
    }
  }
});
