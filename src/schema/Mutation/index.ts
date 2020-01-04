import { GraphQLObjectType } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { authorizeUser } from "./authorizeUser";
import { signIn } from "./signIn";
import { signUp } from "./signUp";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: createFieldMap({ authorizeUser, signIn, signUp })
});
