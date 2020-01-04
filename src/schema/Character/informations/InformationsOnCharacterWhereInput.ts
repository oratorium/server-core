import { createWhereInput } from "../../../utils/graphql-helper";
import { StringOperator } from "../../Operators";

export const InformationsOnCharacterWhereInput = createWhereInput("InformationsOnCharacter", {
  type: {
    type: StringOperator
  }
});
