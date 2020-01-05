import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CommunityRepository } from "../../../repositories/Community";
import { UserRepository } from "../../../repositories/User";
import { UserCommunityRepository } from "../../../repositories/UserCommunity";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { CommunitiesOnUserWhereInput } from "./CommunitiesOnUserWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const communities = (Community: GraphQLObjectType) =>
  createField<UserRepository, Args>({
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
        type: CommunitiesOnUserWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("Community.*")
        .from(CommunityRepository, "Community")
        .innerJoin(UserCommunityRepository, "UserCommunity", "UserCommunity.userId = :userId", { userId: parent.id })
        .where("Community.id = UserCommunity.communityId")
        .limit(args.perPage)
        .offset(args.page * args.perPage);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return loadMany<CommunityRepository>(query, parameterList);
    }
  });
