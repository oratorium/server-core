import Time from "dayjs";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { getConnection } from "typeorm";

import { TokenRepository } from "../../../repositories/Token";
import { UserRepository } from "../../../repositories/User";
import { UserAccountRepository } from "../../../repositories/UserAccount";
import { createField } from "../../../utils/graphql-helper";
import { throws } from "../../../utils/throws";
import { MentionID } from "../../Scalars";

type Args = {
  email: string;
  password: string;
  mentionId: string;
  displayName: string;
};

export const signUp = createField<any, Args>({
  type: GraphQLBoolean,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    mentionId: {
      type: new GraphQLNonNull(MentionID)
    },
    displayName: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(parent, args, context, info) {
    const { email, password, mentionId, displayName } = args;
    await getConnection().transaction(async EntityManager => {
      const user = await EntityManager.getRepository(UserRepository)
        .insert({ mentionId, displayName })
        .catch(() => throws(new Error("이미 존재하는 멘션 아이디입니다.")));
      const salt = UserAccountRepository.createSalt();
      const userAccountRepository = await EntityManager.getRepository(UserAccountRepository)
        .insert({
          userId: user.generatedMaps[0].id,
          email,
          salt,
          password: await UserAccountRepository.hashPassword(password, salt)
        })
        .catch(() => throws(new Error("이미 존재하는 이메일입니다.")));
      const token = await EntityManager.getRepository(TokenRepository).insert({
        type: "User::Authorization",
        value: userAccountRepository.generatedMaps[0].id,
        expiresAt: Time()
          .add(7, "day")
          .toDate()
      });
    });
  }
});
