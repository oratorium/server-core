import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { DateTime } from "../Scalars/DateTime";

export const Kind = new GraphQLObjectType({
  name: "Kind",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    parentId: {
      type: GraphQLID
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  }
});
