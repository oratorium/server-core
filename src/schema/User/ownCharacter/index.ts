import { GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { UserRepository } from "../../../repositories/User";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { ownCharacterOnUserWhereInput } from "./OwnCharactersOnUserWhereInputs";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const ownCharacter = (Character: GraphQLObjectType) =>
  createField<UserRepository, Args>({
    type: Character,
    args: {
      where: {
        type: ownCharacterOnUserWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("`Character`.*")
        .from(CharacterRepository, "Character")
        .where("Character.userId = :userId", { userId: parent.id })
        .limit(1);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return load<CharacterRepository>(query, parameterList);
    }
  });
