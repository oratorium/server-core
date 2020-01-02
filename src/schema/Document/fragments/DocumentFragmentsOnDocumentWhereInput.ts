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

const DocumentFragmentsOnDocumentOrWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentsOnDocumentOrWhereInput",
  fields: createOperator()
});

export const DocumentFragmentsOnDocumentWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentsOnDocumentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentFragmentsOnDocumentOrWhereInput))
    }
  }
});
