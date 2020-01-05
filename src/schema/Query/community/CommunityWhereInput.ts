import { createWhereInput } from "../../../utils/graphql-helper";
import { BooleanOperator, DateTimeOperator, IdOperator, IntOperator, StringOperator } from "../../Operators";

export const CommunityWhereInput = createWhereInput("Community", {
  id: {
    type: IdOperator
  },
  path: {
    type: StringOperator
  },
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
  },
  createdAt: {
    type: DateTimeOperator
  }
});
