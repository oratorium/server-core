import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { CommunityRepository } from "../../../repositories/Community";
import { CommunityCharacterRepository } from "../../../repositories/CommunityCharacter";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { CharactersOnCommunityWhereInput } from "./CharactersOnCommunityWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const characters = (Character: GraphQLObjectType) =>
  createField<CommunityRepository, Args>({
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
        type: CharactersOnCommunityWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("`Character`.*")
        .from(CharacterRepository, "Character")
        .innerJoin(CommunityCharacterRepository, "CommunityCharacter", "CommunityCharacter.characterId = :characterId", {
          characterId: parent.id
        })
        .where("Character.id = CommunityCharacter.communityId")
        .limit(args.perPage)
        .offset(args.page * args.perPage);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return loadMany<CharacterRepository>(query, parameterList);
    }
  });
