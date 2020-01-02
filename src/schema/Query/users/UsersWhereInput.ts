import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

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

const UsersOrWhereInput = new GraphQLInputObjectType({
  name: "UsersOrWhereInput",
  fields: createOperator()
});

export const UsersWhereInput = new GraphQLInputObjectType({
  name: "UsersWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(UsersOrWhereInput))
    }
  }
});
