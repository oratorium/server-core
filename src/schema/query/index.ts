import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { config } from "./config";
import { configs } from "./configs";
import { user } from "./user";
import { users } from "./users";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: createFieldMap({ config, configs, user, users })
});
