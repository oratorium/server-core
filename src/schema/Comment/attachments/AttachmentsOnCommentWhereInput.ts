import { createWhereInput } from "../../../utils/graphql-helper";
import { StringOperator } from "../../Operators";

export const AttachmentsOnCommentWhereInput = createWhereInput("AttachmentsOnComment", {
  type: {
    type: StringOperator
  }
});
