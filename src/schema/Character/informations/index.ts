import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { CharacterInformationRepository } from "../../../repositories/CharacterInformation";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { CharacterInformation } from "../../CharacterInformation";
import { PageInt, PerPageInt } from "../../Scalars";
import { InformationsOnCharacterWhereInput } from "./InformationsOnCharacterWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const informations = createField<CharacterRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CharacterInformation))),
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
      type: InformationsOnCharacterWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("CharacterInformation.*")
      .from(CharacterInformationRepository, "CharacterInformation")
      .where("CharacterInformation.characterId = :characterId", { characterId: parent.id })
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<CharacterInformationRepository>(query, parameterList);
  }
});
