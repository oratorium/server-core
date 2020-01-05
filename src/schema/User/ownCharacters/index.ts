import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { UserRepository } from "../../../repositories/User";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { OwnCharactersOnUserWhereInput } from "./OwnCharactersOnUserWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const ownCharacters = (Character: GraphQLObjectType) =>
  createField<UserRepository, Args>({
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Character))),
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
        type: OwnCharactersOnUserWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("`Character`.*")
        .from(CharacterRepository, "Character")
        .where("Character.userId = :userId", { userId: parent.id })
        .limit(args.perPage)
        .offset(args.page * args.perPage);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return loadMany<CharacterRepository>(query, parameterList);
    }
  });
