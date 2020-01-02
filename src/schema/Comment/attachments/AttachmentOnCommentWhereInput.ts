import { createWhereInput } from "../../../utils/graphql-helper";
import { StringOperator } from "../../Operators";

export const AttachmentOnCommentWhereInput = createWhereInput("AttachmentOnComment", {
  type: {
    type: StringOperator
  }
});
