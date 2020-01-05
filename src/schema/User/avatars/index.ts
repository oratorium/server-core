import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { UserAvatarRepository } from "../../../repositories/UserAvatar";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { UserAvatar } from "../../UserAvatar";
import { AvatarsOnUserWhereInput } from "./AvatarsOnUserWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const avatars = createField<UserRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserAvatar))),
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
      type: AvatarsOnUserWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("`UserAvatar`.*")
      .from(UserAvatarRepository, "UserAvatar")
      .where("UserAvatar.userId = :userId", { userId: parent.id })
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<UserAvatarRepository>(query, parameterList);
  }
});
