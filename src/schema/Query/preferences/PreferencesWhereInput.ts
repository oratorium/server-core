import { createWhereInput } from "../../../utils/graphql-helper";
import { IdOperator, StringOperator } from "../../Operators";

export const PreferencesWhereInput = createWhereInput("Preferences", {
  id: {
    type: IdOperator
  },
  kind: {
    type: StringOperator
  },
  key: {
    type: StringOperator
  }
});
