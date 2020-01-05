import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { UserAvatarRepository } from "../../repositories/UserAvatar";
import { createFieldMap } from "../../utils/graphql-helper";
import { DateTime } from "../Scalars";

export const UserAvatar = new GraphQLObjectType({
  name: "UserAvatar",
  fields: createFieldMap<UserAvatarRepository>({
    id: {
      type: GraphQLNonNull(GraphQLID)
    },
    userId: {
      type: GraphQLNonNull(GraphQLID)
    },
    isCurrent: {
      type: GraphQLNonNull(GraphQLBoolean)
    },
    extension: {
      type: GraphQLNonNull(GraphQLString)
    },
    imagePath: {
      type: GraphQLNonNull(GraphQLString)
    },
    createdAt: {
      type: GraphQLNonNull(DateTime)
    }
  })
});
