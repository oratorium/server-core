import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const ownCharacterOnUserWhereInput = createWhereInput("ownCharacterOnUser", {
  createdAt: {
    type: DateTimeOperator
  }
});
