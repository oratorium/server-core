import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

export const UniversesWhereInput = createWhereInput("Universes", {
  id: {
    type: IdOperator
  },
  displayName: {
    type: IdOperator
  },
  description: {
    type: StringOperator
  },
  createdAt: {
    type: DateTimeOperator
  }
});
