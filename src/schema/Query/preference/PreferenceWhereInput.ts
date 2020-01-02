import { createWhereInput } from "../../../utils/graphql-helper";
import { IdOperator, StringOperator } from "../../Operators";

export const PreferenceWhereInput = createWhereInput("Preference", {
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
