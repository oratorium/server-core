import { createWhereInput } from "../../../utils/graphql-helper";
import { StringOperator } from "../../Operators";

export const UniversesOnCharacterWhereInput = createWhereInput("UniversesOnCharacter", {
  type: {
    type: StringOperator
  }
});
