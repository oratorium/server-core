import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator } from "../../Operators";

export const CommentOnCommentWhereInput = createWhereInput("CommentOnComment", {
  createdAt: {
    type: DateTimeOperator
  },
  updatedAt: {
    type: DateTimeOperator
  },
  deletedAt: {
    type: DateTimeOperator
  }
});
