import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { signIn } from "./signIn";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: createFieldMap({ signIn })
});
