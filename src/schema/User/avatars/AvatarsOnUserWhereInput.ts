import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, DateTimeOperator } from "../../Operators";

export const AvatarsOnUserWhereInput = createWhereInput("AvatarsOnUser", {
  isCurrent: {
    type: BooleanOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
