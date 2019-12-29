import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator } from "../IdOperator";
import { StringOperator } from "../StringOperator";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  kind: {
    type: StringOperator
  },
  key: {
    type: StringOperator
  }
});

const ConfigOrWhereInput = new GraphQLInputObjectType({
  name: "ConfigOrWhereInput",
  fields: { ...createOperator() }
});

export const ConfigWhereInput = new GraphQLInputObjectType({
  name: "ConfigWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(ConfigOrWhereInput))
    }
  }
});
