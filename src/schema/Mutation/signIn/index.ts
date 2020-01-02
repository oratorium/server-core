import { GraphQLNonNull, GraphQLString } from "graphql";
import { getRepository } from "typeorm";

import { UserRepository } from "../../../repositories/User";
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
    const user = await getRepository(UserRepository).findOne({ where: { email, password } });
    if (!user) {
      throw new Error("이메일 혹은 암호가 올바르지 않습니다");
    }
    context.loaders.user.prime(user.id, user);
    return user;
  }
});
