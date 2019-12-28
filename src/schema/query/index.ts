import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { user } from "./user";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: createFieldMap({ user })
});
