import { GraphQLSchema } from "graphql";

import { Query } from "./Queries";
import { Mutation } from "./Mutations";

export const schema = new GraphQLSchema({ query: Query, mutation: Mutation });
