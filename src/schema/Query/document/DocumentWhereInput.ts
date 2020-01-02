import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

export const DocumentWhereInput = createWhereInput("Document", {
  id: {
    type: IdOperator
  },
  name: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
