import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../DateTime";

export const User = new GraphQLObjectType({
  name: "User",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  })
});
