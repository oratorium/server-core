import { GraphQLSchema } from "graphql";

import { Query } from "./Query";
import { Mutation } from "./Mutation";

export const schema = new GraphQLSchema({ query: Query, mutation: Mutation });
