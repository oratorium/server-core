import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { BooleanOperator } from "../../BooleanOperator";
import { IntOperator } from "../../IntOperator";
import { StringOperator } from "../../StringOperator";

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
