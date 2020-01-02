import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { StringOperator } from "../StringOperator";

const createOperator = () => ({
  type: {
    type: StringOperator
  }
});

const AttachmentOrChildrenWhereInput = new GraphQLInputObjectType({
  name: "AttachmentChildrenOrWhereInput",
  fields: createOperator()
});

export const AttachmentChildrenWhereInput = new GraphQLInputObjectType({
  name: "AttachmentChildrenWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(AttachmentOrChildrenWhereInput))
    }
  }
});
