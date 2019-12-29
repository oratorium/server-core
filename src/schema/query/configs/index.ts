import { GraphQLList, GraphQLNonNull } from "graphql";

import { createField } from "../../../utils/graphql-helper";
import { Config } from "../../Config";
import { ConfigWhereInput } from "../../ConfigWhereInput";

export const configs = createField({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Config))),
  args: {
    where: {
      type: new GraphQLNonNull(ConfigWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    return [];
  }
});
