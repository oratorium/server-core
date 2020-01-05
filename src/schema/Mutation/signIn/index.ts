import { GraphQLNonNull, GraphQLString } from "graphql";
import { getRepository } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { UserAccountRepository } from "../../../repositories/UserAccount";
import { createField } from "../../../utils/graphql-helper";
import { Self } from "../../Self";

type Args = {
  email: string;
  password: string;
};

export const signIn = createField<any, Args>({
  type: new GraphQLNonNull(Self),
  args: {
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  },
  async resolve(parent, args, context, info) {
    const { email, password } = args;
    const userAccount = await getRepository(UserAccountRepository).findOne({ where: { email } });
    if (!userAccount) {
      throw new Error("이메일이 존재하지 않습니다.");
    }
    if (!userAccount.isAuthorized) {
      throw new Error("이메일 인증을 완료해주시기 바랍니다.");
    }
    if (!UserAccountRepository.hashPassword(password, userAccount.salt)) {
      throw new Error("암호가 일치하지 않습니다.");
    }
    const user = await getRepository(UserRepository).findOne({ where: { id: userAccount.userId } });
    return user;
  }
});
