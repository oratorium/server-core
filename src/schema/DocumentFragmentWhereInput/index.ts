import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { BooleanOperator } from "../BooleanOperator";
import { IdOperator } from "../IdOperator";
import { IntOperator } from "../IntOperator";
import { StringOperator } from "../StringOperator";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  documentId: {
    type: IdOperator
  },
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

const DocumentFragmentOrWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentOrWhereInput",
  fields: createOperator()
});

export const DocumentFragmentWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentFragmentOrWhereInput))
    }
  }
});
