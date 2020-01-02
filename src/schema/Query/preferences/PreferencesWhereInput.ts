import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator, StringOperator } from "../../Operators";

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
