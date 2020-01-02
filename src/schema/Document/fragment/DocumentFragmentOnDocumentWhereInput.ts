import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { BooleanOperator, IntOperator, StringOperator } from "../../Operators";

const createOperator = () => ({
  order: {
    type: IntOperator
  },
  type: {
    type: StringOperator
  },
  isOptional: {
    type: BooleanOperator
  },
  value: {
    type: StringOperator
  }
});

const DocumentFragmentOnDocumentOrWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentOnDocumentOrWhereInput",
  fields: createOperator()
});

export const DocumentFragmentOnDocumentWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentOnDocumentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentFragmentOnDocumentOrWhereInput))
    }
  }
});
