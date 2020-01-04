import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { PreferenceRepository } from "../../../repositories/Preference";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Preference } from "../../Preference";
import { PageInt, PerPageInt } from "../../Scalars";
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
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Preference.*")
      .from(PreferenceRepository, "Preference")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<PreferenceRepository>(query, parameterList);
  }
});
