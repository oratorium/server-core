import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { PreferenceRepository } from "../../../repositories/Preference";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Preference } from "../../Preference";
import { PreferenceWhereInput } from "./PreferenceWhereInput";

export const preference = createField({
  type: Preference,
  args: {
    where: {
      type: new GraphQLNonNull(PreferenceWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Preference.*")
      .from(PreferenceRepository, "Preference")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<PreferenceRepository>(query, parameterList);
  }
});
