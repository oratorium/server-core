import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { getConnection } from "typeorm";

import { TokenRepository } from "../../../repositories/Token";
import { UserRepository } from "../../../repositories/User";
import { createField } from "../../../utils/graphql-helper";

type Args = {
  token: string;
};

export const authorizeUser = createField<any, Args>({
  type: GraphQLBoolean,
  args: {
    token: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(parent, args, context, info) {
    await getConnection().transaction(async entityManager => {
      const tokenRepository = await entityManager.getRepository(TokenRepository).findOne({ where: { id: args.token } });
      if (!tokenRepository) {
        throw new Error("존재하지 않는 토큰입니다.");
      }
      if (tokenRepository.isConsumed) {
        throw new Error("이미 소비한 토큰입니다.");
      }
      await entityManager
        .getRepository(UserRepository)
        .createQueryBuilder()
        .update()
        .set({ isAuthorized: true })
        .where({ id: tokenRepository.value })
        .execute();
      await entityManager
        .getRepository(TokenRepository)
        .createQueryBuilder()
        .update()
        .set({ isConsumed: true })
        .where({ id: tokenRepository.id })
        .execute();
    });
  }
});
