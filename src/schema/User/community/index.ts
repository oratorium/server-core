import { GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CommunityRepository } from "../../../repositories/Community";
import { UserRepository } from "../../../repositories/User";
import { UserCommunityRepository } from "../../../repositories/UserCommunity";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { CommunityOnUserWhereInput } from "./CommunityOnUserWhereInput";

type Args = {
  where: any;
};

export const community = (Community: GraphQLObjectType) =>
  createField<UserRepository, Args>({
    type: Community,
    args: {
      where: {
        type: CommunityOnUserWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("Community.*")
        .from(CommunityRepository, "Community")
        .innerJoin(UserCommunityRepository, "UserCommunity", "UserCommunity.userId = :userId", { userId: parent.id })
        .where("Community.id = UserCommunity.communityId")
        .limit(1);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return load<CommunityRepository>(query, parameterList);
    }
  });
