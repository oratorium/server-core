import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";

export const CharacterInformation = new GraphQLObjectType({
  name: "CharacterInformation",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    characterId: {
      type: GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    type: {
      type: GraphQLNonNull(GraphQLString)
    },
    value: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
