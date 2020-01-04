import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Character } from "../../Character";
import { CharacterWhereInput } from "./CharacterWhereInput";

export const character = createField({
  type: Character,
  args: {
    where: {
      type: new GraphQLNonNull(CharacterWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("`Character`.*")
      .from(CharacterRepository, "Character")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<CharacterRepository>(query, parameterList);
  }
});
