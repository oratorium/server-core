import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { ConfigRepository } from "../../../repositories/Config";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Config } from "../../Config";
import { ConfigWhereInput } from "../../ConfigWhereInput";

export const config = createField({
  type: Config,
  args: {
    where: {
      type: new GraphQLNonNull(ConfigWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Config.*")
      .from(ConfigRepository, "Config")
      .where(createBracket(args.where, { id: "Config.id", name: "Config.name" }))
      .getQueryAndParameters();
    const config = await context.loaders.query.load<ConfigRepository>({ query, parameterList });
    if (config) {
      context.loaders.config.prime(config.id, config);
    }
    return config;
  }
});
