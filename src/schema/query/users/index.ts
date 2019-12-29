import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { User } from "../../User";
import { UserWhereInput } from "../../UserWhereInput";

export const users = createField({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
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
      .where(createBracket(args.where, { id: "User.id", name: "User.name" }))
      .getQueryAndParameters();
    const userList = await context.loaders.query.load<UserRepository>({ query, parameterList, isArray: true });
    userList.forEach(user => {
      context.loaders.user.prime(user.id, user);
    });
    return userList;
  }
});
