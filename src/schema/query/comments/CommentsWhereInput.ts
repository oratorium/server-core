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

const CommentsOrWhereInput = new GraphQLInputObjectType({
  name: "CommentsOrWhereInput",
  fields: createOperator()
});

export const CommentsWhereInput = new GraphQLInputObjectType({
  name: "CommentsWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(CommentsOrWhereInput))
    }
  }
});
