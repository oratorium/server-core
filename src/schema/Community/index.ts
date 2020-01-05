import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";

export const Community = new GraphQLObjectType({
  name: "Community",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    path: {
      type: GraphQLNonNull(GraphQLString)
    },
    displayName: {
      type: GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLNonNull(GraphQLString)
    },
    isPublic: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    ageRestriction: {
      type: GraphQLNonNull(GraphQLInt)
    },
    assignmentType: {
      type: GraphQLNonNull(GraphQLString)
    },
    creationLevel: {
      type: GraphQLNonNull(GraphQLInt)
    },
    personality: {
      type: GraphQLNonNull(GraphQLString)
    },
    themeColor: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  })
});
