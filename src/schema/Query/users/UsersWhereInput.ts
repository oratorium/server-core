import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

export const UsersWhereInput = createWhereInput("Users", {
  id: {
    type: IdOperator
  },
  email: {
    type: StringOperator
  },
  displayName: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
