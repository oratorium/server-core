import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { PreferenceRepository } from "../../../repositories/Preference";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Preference } from "../../Preference";
import { PreferenceWhereInput } from "../../PreferenceWhereInput";

export const preferences = createField({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Preference))),
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
      .getQueryAndParameters();
    const preferenceList = await context.loaders.query.load<PreferenceRepository>({ query, parameterList, isArray: true });
    preferenceList.forEach(preference => context.loaders.preference.prime(preference.id, preference));
    return preferenceList;
  }
});
