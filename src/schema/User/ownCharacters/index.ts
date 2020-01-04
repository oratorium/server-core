import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { UserRepository } from "../../../repositories/User";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { PageInt, PerPageInt } from "../../Scalars";
import { ownCharactersOnUserWhereInput } from "./ownCharactersOnUserWhereInput";

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
        type: PageInt,
        defaultValue: 0
      },
      perPage: {
        type: PerPageInt,
        defaultValue: 20
      },
      where: {
        type: ownCharactersOnUserWhereInput
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
      return load<CharacterRepository>(query, parameterList);
    }
  });
