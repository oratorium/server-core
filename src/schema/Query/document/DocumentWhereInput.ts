import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator, StringOperator, DateTimeOperator } from "../../Operators";

const createOperator = () => ({
  id: {
    type: IdOperator
  },
  name: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});

const DocumentOrWhereInput = new GraphQLInputObjectType({
  name: "DocumentOrWhereInput",
  fields: createOperator()
});

export const DocumentWhereInput = new GraphQLInputObjectType({
  name: "DocumentWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentOrWhereInput))
    }
  }
});
