import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars/DateTime";
import { fragment } from "./fragment";
import { fragments } from "./fragments";

export const Document = new GraphQLObjectType({
  name: "Document",
  fields: createFieldMap({
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
  })
});
