import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { PreferenceRepository } from "../../../repositories/Preference";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { PageInt } from "../../PageInt";
import { PerPageInt } from "../../PerPageInt";
import { Preference } from "../../Preference";
import { PreferencesWhereInput } from "./PreferencesWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const preferences = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Preference))),
  args: {
    page: {
      type: PageInt,
      defaultValue: 0
    },
    perPage: {
      type: PerPageInt,
      defaultValue: 20
    },
    where: {
      type: new GraphQLNonNull(PreferencesWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Preference.*")
      .from(PreferenceRepository, "Preference")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    const preferenceList = await context.loaders.query.load<PreferenceRepository>({ query, parameterList, isArray: true });
    preferenceList.forEach(preference => context.loaders.preference.prime(preference.id, preference));
    return preferenceList;
  }
});
