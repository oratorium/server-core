import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { User } from "../../User";
import { UserWhereInput } from "./UserWhereInput";

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
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("User.*")
      .from(UserRepository, "User")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<UserRepository>(query, parameterList);
  }
});
