import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { UniverseRepository } from "../../../repositories/Universe";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Universe } from "../../Universe";
import { UniverseWhereInput } from "./UniverseWhereInput";

export const universe = createField({
  type: Universe,
  args: {
    where: {
      type: new GraphQLNonNull(UniverseWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Universe.*")
      .from(UniverseRepository, "Universe")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<UniverseRepository>(query, parameterList);
  }
});
