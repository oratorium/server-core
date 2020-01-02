import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { BooleanOperator } from "../../Operators/BooleanOperator";
import { IntOperator } from "../../Operators/IntOperator";
import { StringOperator } from "../../Operators/StringOperator";

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
