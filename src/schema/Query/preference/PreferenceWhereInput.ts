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

const PreferenceOrWhereInput = new GraphQLInputObjectType({
  name: "PreferenceOrWhereInput",
  fields: createOperator()
});

export const PreferenceWhereInput = new GraphQLInputObjectType({
  name: "PreferenceWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(PreferenceOrWhereInput))
    }
  }
});
