import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { signIn } from "./signIn";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: createFieldMap({ signIn })
});
