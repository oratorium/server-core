import { createField } from "../../../utils/graphql-helper";
import { User } from "../../User";

export const user = createField({
  type: User,
  resolve() {
    return {
      id: 1,
      displayName: "Danuel",
      createdAt: new Date()
    };
  }
});
