import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";

export const Hashtag = new GraphQLObjectType({
  name: "Hashtag",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
