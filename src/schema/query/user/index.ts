import { GraphQLNonNull } from "graphql";

import { createField } from "../../../utils/graphql-helper";
import { User } from "../../User";
import { UserWhereInput } from "../../UserWhereInput";

export const user = createField({
  type: User,
  args: {
    where: {
      type: new GraphQLNonNull(UserWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    return {
      id: 1,
      displayName: "Danuel",
      createdAt: new Date()
    };
  }
});
