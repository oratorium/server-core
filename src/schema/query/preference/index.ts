import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { PreferenceRepository } from "../../../repositories/Preference";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Preference } from "../../Preference";
import { PreferenceWhereInput } from "../../PreferenceWhereInput";

export const preference = createField({
  type: Preference,
  args: {
    where: {
      type: new GraphQLNonNull(PreferenceWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Preference.*")
      .from(PreferenceRepository, "Preference")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    const preference = await context.loaders.query.load<PreferenceRepository>({ query, parameterList });
    if (preference) {
      context.loaders.preference.prime(preference.id, preference);
    }
    return preference;
  }
});
