import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { preference } from "./preference";
import { preferences } from "./preferences";
import { user } from "./user";
import { users } from "./users";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: createFieldMap({ preference, preferences, user, users })
});
