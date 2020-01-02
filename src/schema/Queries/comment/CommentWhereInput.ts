import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator } from "../../Operators/DateTimeOperator";
import { IdOperator } from "../../Operators/IdOperator";
import { IntOperator } from "../../Operators/IntOperator";
import { StringOperator } from "../../Operators/StringOperator";

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
