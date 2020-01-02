import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, IntOperator, StringOperator } from "../../Operators";

export const DocumentFragmentOnDocumentWhereInput = createWhereInput("DocumentFragmentOnDocument", {
  order: {
    type: IntOperator
  },
  type: {
    type: StringOperator
  },
  isOptional: {
    type: BooleanOperator
  },
  value: {
    type: StringOperator
  }
});
