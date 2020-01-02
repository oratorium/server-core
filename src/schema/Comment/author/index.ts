import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { UserRepository } from "../../../repositories/User";
import { createField } from "../../../utils/graphql-helper";
import { User } from "../../User";

export const author = createField<CommentRepository>({
  type: User,
  async resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("User.*")
      .from(UserRepository, "User")
      .where("id = :id", { id: parent.userId })
      .limit(1);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    const user = await context.loaders.query.load<UserRepository>({ query, parameterList });
    if (user) {
      context.loaders.user.prime(user.id, user);
    }
    return user;
  }
});
