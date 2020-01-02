import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { StringOperator } from "../../Operators/StringOperator";

const createOperator = () => ({
  type: {
    type: StringOperator
  }
});

const AttachmentOnCommentOrWhereInput = new GraphQLInputObjectType({
  name: "AttachmentOnCommentOrWhereInput",
  fields: createOperator()
});

export const AttachmentOnCommentWhereInput = new GraphQLInputObjectType({
  name: "AttachmentOnCommentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(AttachmentOnCommentOrWhereInput))
    }
  }
});
