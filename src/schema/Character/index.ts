import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";
import { User } from "../User";
import { informations } from "./informations";
import { owner } from "./owner";
import { universes } from "./universes";

export const Character = new GraphQLObjectType({
  name: "Character",
  fields: createFieldMap(() => ({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: GraphQLNonNull(GraphQLID)
    },
    characterId: {
      type: GraphQLNonNull(GraphQLID)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    },
    informations,
    owner: owner(User),
    universes
  }))
});
