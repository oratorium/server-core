import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { BooleanOperator } from "../BooleanOperator";
import { IntOperator } from "../IntOperator";
import { StringOperator } from "../StringOperator";

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

const DocumentFragmentOrChildrenWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentChildrenOrWhereInput",
  fields: createOperator()
});

export const DocumentFragmentChildrenWhereInput = new GraphQLInputObjectType({
  name: "DocumentFragmentChildrenWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentFragmentOrChildrenWhereInput))
    }
  }
});
