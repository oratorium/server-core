import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { UserAvatarRepository } from "../../../repositories/UserAvatar";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { UserAvatar } from "../../UserAvatar";
import { AvatarOnUserWhereInput } from "./AvatarOnUserWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const avatar = createField<UserRepository, Args>({
  type: UserAvatar,
  args: {
    where: {
      type: AvatarOnUserWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("`UserAvatar`.*")
      .from(UserAvatarRepository, "UserAvatar")
      .where("UserAvatar.userId = :userId", { userId: parent.id })
      .limit(1);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return load<UserAvatarRepository>(query, parameterList);
  }
});
