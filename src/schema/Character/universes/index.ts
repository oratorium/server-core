import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { CharacterUniverseRepository } from "../../../repositories/CharacterUniverse";
import { UniverseRepository } from "../../../repositories/Universe";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { PageInt, PerPageInt } from "../../Scalars";
import { Universe } from "../../Universe";
import { UniversesOnCharacterWhereInput } from "./UniversesOnCharacterWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const universes = createField<CharacterRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Universe))),
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
      type: UniversesOnCharacterWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Universe.*")
      .from(UniverseRepository, "Universe")
      .innerJoin(CharacterUniverseRepository, "CharacterUniverse", "CharacterUniverse.characterId = :characterId", {
        characterId: parent.id
      })
      .where("Universe.id = CharacterUniverse.universeId")
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<UniverseRepository>(query, parameterList);
  }
});
