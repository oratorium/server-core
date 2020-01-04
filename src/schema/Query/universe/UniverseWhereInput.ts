import { createWhereInput } from "../../../utils/graphql-helper";
import { DateTimeOperator, IdOperator, StringOperator } from "../../Operators";

export const UniverseWhereInput = createWhereInput("Universe", {
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
