import { GraphQLList, GraphQLNonNull } from "graphql";

import { createField } from "../../../utils/graphql-helper";
import { User } from "../../User";
import { UserWhereInput } from "../../UserWhereInput";

export const users = createField({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
  args: {
    where: {
      type: new GraphQLNonNull(UserWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    return [];
  }
});
