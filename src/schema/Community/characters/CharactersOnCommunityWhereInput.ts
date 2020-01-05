import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, StringOperator } from "../../Operators";

export const CharactersOnCommunityWhereInput = createWhereInput("CharactersOnCommunity", {
  displayName: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
