import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { PageInt } from "../../PageInt";
import { PerPageInt } from "../../PerPageInt";
import { User } from "../../User";
import { UserWhereInput } from "../../UserWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const users = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
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
      type: new GraphQLNonNull(UserWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("User.*")
      .from(UserRepository, "User")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    const userList = await context.loaders.query.load<UserRepository>({ query, parameterList, isArray: true });
    userList.forEach(user => context.loaders.user.prime(user.id, user));
    return userList;
  }
});
