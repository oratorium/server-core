import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";

export const DocumentFragment = new GraphQLObjectType({
  name: "DocumentFragment",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    documentId: {
      type: GraphQLNonNull(GraphQLID)
    },
    order: {
      type: GraphQLNonNull(GraphQLInt)
    },
    type: {
      type: GraphQLNonNull(GraphQLString)
    },
    isOptional: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    value: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
