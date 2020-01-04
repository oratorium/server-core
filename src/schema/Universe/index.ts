import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";

export const Universe = new GraphQLObjectType({
  name: "Universe",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  })
});
