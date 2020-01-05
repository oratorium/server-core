import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, StringOperator } from "../../Operators";

export const CharacterOnCommunityWhereInput = createWhereInput("CharacterOnCommunity", {
  displayName: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
