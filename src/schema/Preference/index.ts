import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const Preference = new GraphQLObjectType({
  name: "Preference",
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
