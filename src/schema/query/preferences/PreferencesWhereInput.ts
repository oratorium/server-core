import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator } from "../../IdOperator";
import { StringOperator } from "../../StringOperator";

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

const PreferencesOrWhereInput = new GraphQLInputObjectType({
  name: "PreferencesOrWhereInput",
  fields: createOperator()
});

export const PreferencesWhereInput = new GraphQLInputObjectType({
  name: "PreferencesWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(PreferencesOrWhereInput))
    }
  }
});
