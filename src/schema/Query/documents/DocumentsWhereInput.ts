import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull } from "graphql";

import { IdOperator } from "../../Operators/IdOperator";
import { StringOperator } from "../../Operators/StringOperator";
import { DateTimeOperator } from "../../Operators/DateTimeOperator";

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

const DocumentsOrWhereInput = new GraphQLInputObjectType({
  name: "DocumentsOrWhereInput",
  fields: createOperator()
});

export const DocumentsWhereInput = new GraphQLInputObjectType({
  name: "DocumentsWhereInput",
  fields: {
    ...createOperator(),
    or: {
      type: new GraphQLList(new GraphQLNonNull(DocumentsOrWhereInput))
    }
  }
});
