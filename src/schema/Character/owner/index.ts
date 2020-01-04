import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { UserRepository } from "../../../repositories/User";
import { createField, load } from "../../../utils/graphql-helper";

export const owner = (User: GraphQLObjectType) =>
  createField<CharacterRepository>({
    type: new GraphQLNonNull(User),
    resolve(parent, args, context, info) {
      const [query, parameterList] = getConnection()
        .createQueryBuilder()
        .select("User.*")
        .from(UserRepository, "User")
        .where("User.id = :userId", { userId: parent.userId })
        .limit(1)
        .getQueryAndParameters();
      return load<UserRepository>(query, parameterList);
    }
  });
