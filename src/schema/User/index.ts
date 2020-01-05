import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { Character } from "../Character";
import { DateTime } from "../Scalars";
import { ownCharacter } from "./ownCharacter";
import { ownCharacters } from "./ownCharacters";

export const User = new GraphQLObjectType({
  name: "User",
  fields: createFieldMap(() => ({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    mentionId: {
      type: GraphQLNonNull(GraphQLString)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    },
    ownCharacter: ownCharacter(Character),
    ownCharacters: ownCharacters(Character)
  }))
});
