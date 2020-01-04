import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, IntOperator, StringOperator } from "../../Operators";

export const CommentWhereInput = createWhereInput("Comment", {
  id: {
    type: IdOperator
  },
  userId: {
    type: IdOperator
  },
  parentId: {
    type: IdOperator
  },
  depth: {
    type: IntOperator
  },
  order: {
    type: IntOperator
  },
  value: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  },
  updatedAt: {
    type: DateTimeOperator
  }
});
