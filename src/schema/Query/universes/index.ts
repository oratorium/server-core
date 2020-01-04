import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UniverseRepository } from "../../../repositories/Universe";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { PageInt, PerPageInt } from "../../Scalars";
import { Universe } from "../../Universe";
import { UniversesWhereInput } from "./UniversesWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const universes = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Universe))),
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
      type: new GraphQLNonNull(UniversesWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Universe.*")
      .from(UniverseRepository, "Universe")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<UniverseRepository>(query, parameterList);
  }
});
