import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

export const CharacterWhereInput = createWhereInput("Character", {
  id: {
    type: IdOperator
  },
  userId: {
    type: IdOperator
  },
  characterId: {
    type: IdOperator
  },
  displayName: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
