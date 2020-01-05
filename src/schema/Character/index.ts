import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { Comment } from "../Comment";
import { DateTime } from "../Scalars";
import { User } from "../User";
import { comments } from "./comments";
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
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    },
    comments: comments(Comment),
    informations,
    owner: owner(User),
    universes
  }))
});
