import { GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { CommunityRepository } from "../../../repositories/Community";
import { CommunityCharacterRepository } from "../../../repositories/CommunityCharacter";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { CharacterOnCommunityWhereInput } from "./CharacterOnCommunityWhereInput";

type Args = {
  where: any;
};

export const character = (Character: GraphQLObjectType) =>
  createField<CommunityRepository, Args>({
    type: Character,
    args: {
      where: {
        type: CharacterOnCommunityWhereInput
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
        .limit(1);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return load<CharacterRepository>(query, parameterList);
    }
  });
