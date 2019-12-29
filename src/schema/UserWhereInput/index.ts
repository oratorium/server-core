import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator } from "../IdOperator";
import { StringOperator } from "../StringOperator";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  name: {
    type: StringOperator
  }
});

const UserOrWhereInput = new GraphQLInputObjectType({
  name: "UserOrWhereInput",
  fields: { ...createOperator() }
});

export const UserWhereInput = new GraphQLInputObjectType({
  name: "UserWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(UserOrWhereInput))
    }
  }
});
