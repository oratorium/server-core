import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Character } from "../../Character";
import { PageInt, PerPageInt } from "../../Scalars";
import { CharactersWhereInput } from "./CharactersWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const characters = createField<any, Args>({
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
      type: new GraphQLNonNull(CharactersWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("`Character`.*")
      .from(CharacterRepository, "Character")
      .andWhere(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<CharacterRepository>(query, parameterList);
  }
});
