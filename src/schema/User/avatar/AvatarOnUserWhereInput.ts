import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, DateTimeOperator } from "../../Operators";

export const AvatarOnUserWhereInput = createWhereInput("AvatarOnUser", {
  isCurrent: {
    type: BooleanOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
