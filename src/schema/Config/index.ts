import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const Config = new GraphQLObjectType({
  name: "Config",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    kind: {
      type: GraphQLNonNull(GraphQLString)
    },
    key: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});
