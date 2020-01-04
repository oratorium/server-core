import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { loadMany } from "../../../utils/graphql-helper";
import { PageInt, PerPageInt } from "../../Scalars";
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
      type: PageInt,
      defaultValue: 0
    },
    perPage: {
      type: PerPageInt,
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
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<UserRepository>(query, parameterList);
  }
});
