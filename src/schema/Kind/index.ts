import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";

export const Kind = new GraphQLObjectType({
  name: "Kind",
  fields: createFieldMap({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    parentId: {
      type: GraphQLID
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  })
});
