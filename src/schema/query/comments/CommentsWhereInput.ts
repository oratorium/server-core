import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator } from "../../DateTimeOperator";
import { IdOperator } from "../../IdOperator";
import { IntOperator } from "../../IntOperator";
import { StringOperator } from "../../StringOperator";

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
