import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { DateTime } from "../Scalars/DateTime";
import { fragment } from "./fragment";
import { fragments } from "./fragments";

export const Document = new GraphQLObjectType({
  name: "Document",
  fields: {
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    },
    fragment,
    fragments
  }
});
