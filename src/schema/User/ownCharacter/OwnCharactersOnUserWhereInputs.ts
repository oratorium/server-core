import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const OwnCharacterOnUserWhereInput = createWhereInput("OwnCharacterOnUser", {
  createdAt: {
    type: DateTimeOperator
  }
});
