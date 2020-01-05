import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, DateTimeOperator } from "../../Operators";

export const AvatarOnUserWhereInput = createWhereInput("AvatarOnUser", {
  isDefault: {
    type: BooleanOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
