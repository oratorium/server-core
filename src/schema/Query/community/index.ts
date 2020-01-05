import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommunityRepository } from "../../../repositories/Community";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Community } from "../../Community";
import { CommunityWhereInput } from "./CommunityWhereInput";

export const community = createField({
  type: Community,
  args: {
    where: {
      type: new GraphQLNonNull(CommunityWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Community.*")
      .from(CommunityRepository, "Community")
      .andWhere(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<CommunityRepository>(query, parameterList);
  }
});
