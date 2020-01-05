import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, IntOperator, StringOperator } from "../../Operators";

export const CommunitiesOnUserWhereInput = createWhereInput("CommunitiesOnUser", {
  displayName: {
    type: StringOperator
  },
  isPublic: {
    type: BooleanOperator
  },
  ageRestriction: {
    type: IntOperator
  },
  assignmentType: {
    type: StringOperator
  },
  creationLevel: {
    type: IntOperator
  },
  personality: {
    type: StringOperator
  }
});
