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
