import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { User } from "../../User";
import { UserWhereInput } from "../../UserWhereInput";

type Args = {
  where: any;
};

export const user = createField<any, Args>({
  type: User,
  args: {
    where: {
      type: new GraphQLNonNull(UserWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("User.*")
      .from(UserRepository, "User")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    const user = await context.loaders.query.load<UserRepository>({ query, parameterList });
    if (user) {
      context.loaders.user.prime(user.id, user);
    }
    return user;
  }
});
