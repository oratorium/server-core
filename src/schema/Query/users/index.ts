import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { User } from "../../User";
import { UsersWhereInput } from "./UsersWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const users = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
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
      type: new GraphQLNonNull(UsersWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("User.*")
      .from(UserRepository, "User")
      .where("isAuthorized = TRUE")
      .andWhere(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<UserRepository>(query, parameterList);
  }
});
