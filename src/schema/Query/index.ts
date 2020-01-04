import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { comment } from "./comment";
import { comments } from "./comments";
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
  fields: createFieldMap({ comment, comments, document, documents, preference, preferences, universe, universes, user, users })
});
