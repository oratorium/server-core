import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, DateTimeOperator } from "../../Operators";

export const AvatarsOnUserWhereInput = createWhereInput("AvatarsOnUser", {
  isDefault: {
    type: BooleanOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
