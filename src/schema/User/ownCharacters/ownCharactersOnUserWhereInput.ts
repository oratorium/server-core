import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const ownCharactersOnUserWhereInput = createWhereInput("ownCharactersOnUser", {
  createdAt: {
    type: DateTimeOperator
  }
});
