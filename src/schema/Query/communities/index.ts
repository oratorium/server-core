import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommunityRepository } from "../../../repositories/Community";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Community } from "../../Community";
import { Page, PerPage } from "../../Scalars";
import { CommunitiesWhereInput } from "./CommunitiesWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const communities = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Community))),
  args: {
    page: {
      type: Page,
      defaultValue: 0
    },
    perPage: {
      type: PerPage,
      defaultValue: 20
    },
    where: {
      type: new GraphQLNonNull(CommunitiesWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Community.*")
      .from(CommunityRepository, "Community")
      .andWhere(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<CommunityRepository>(query, parameterList);
  }
});
