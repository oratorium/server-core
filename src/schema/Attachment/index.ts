import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";

export const Attachment = new GraphQLObjectType({
  name: "Attachment",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    commentId: {
      type: GraphQLNonNull(GraphQLID)
    },
    type: {
      type: GraphQLNonNull(GraphQLString)
    },
    value: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
