import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const CommentsOnCommentWhereInput = createWhereInput("CommentsOnComment", {
  createdAt: {
    type: DateTimeOperator
  },
  updatedAt: {
    type: DateTimeOperator
  }
});
