import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { character } from "./character";
import { characters } from "./characters";
import { comment } from "./comment";
import { comments } from "./comments";
import { community } from "./community";
import { communities } from "./communities";
import { document } from "./document";
import { documents } from "./documents";
import { preference } from "./preference";
import { preferences } from "./preferences";
import { universe } from "./universe";
import { universes } from "./universes";
import { user } from "./user";
import { users } from "./users";

export const Query = new GraphQLObjectType({
  name: "Query",
  fields: createFieldMap({
    character,
    characters,
    comment,
    comments,
    community,
    communities,
    document,
    documents,
    preference,
    preferences,
    universe,
    universes,
    user,
    users
  })
});
