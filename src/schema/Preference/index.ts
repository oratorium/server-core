import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";

export const Preference = new GraphQLObjectType({
  name: "Preference",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    kind: {
      type: GraphQLNonNull(GraphQLString)
    },
    key: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
