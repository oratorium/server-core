import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const OwnCharactersOnUserWhereInput = createWhereInput("OwnCharactersOnUser", {
  createdAt: {
    type: DateTimeOperator
  }
});
