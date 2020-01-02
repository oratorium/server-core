import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { comment } from "./comment";
import { comments } from "./comments";
import { document } from "./document";
import { documents } from "./documents";
import { fragment } from "./fragment";
import { fragments } from "./fragments";
import { preference } from "./preference";
import { preferences } from "./preferences";
import { user } from "./user";
import { users } from "./users";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: createFieldMap({ comment, comments, document, documents, fragment, fragments, preference, preferences, user, users })
});
