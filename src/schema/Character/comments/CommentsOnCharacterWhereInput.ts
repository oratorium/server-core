import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IntOperator } from "../../Operators";

export const CommentsOnCharacterWhereInput = createWhereInput("CommentsOnCharacter", {
  depth: {
    type: IntOperator
  },
  order: {
    type: IntOperator
  },
  createdAt: {
    type: DateTimeOperator
  },
  updatedAt: {
    type: DateTimeOperator
  }
});
