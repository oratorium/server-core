import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator } from "../../DateTimeOperator";
import { IdOperator } from "../../IdOperator";
import { StringOperator } from "../../StringOperator";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  email: {
    type: StringOperator
  },
  displayName: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});

const UserOrWhereInput = new GraphQLInputObjectType({
  name: "UserOrWhereInput",
  fields: createOperator()
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
