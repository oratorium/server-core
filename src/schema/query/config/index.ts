import { GraphQLNonNull } from "graphql";

import { createField } from "../../../utils/graphql-helper";
import { Config } from "../../Config";
import { ConfigWhereInput } from "../../ConfigWhereInput";

export const config = createField({
  type: Config,
  args: {
    where: {
      type: new GraphQLNonNull(ConfigWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    //
  }
});
