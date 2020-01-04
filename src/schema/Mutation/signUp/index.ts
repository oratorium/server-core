import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";
import { getRepository } from "typeorm";

import { UserRepository } from "../../../repositories/User";
import { createField } from "../../../utils/graphql-helper";
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
    const alreadyExistsUser = await getRepository(UserRepository).findOne({ where: [{ email }, { mentionId }, { displayName }] });
    if (alreadyExistsUser) {
      throw new Error("이미 존재하는 이메일 혹은 닉네임 혹은 멘션 아이디입니다");
    }
    await getRepository(UserRepository).insert({
      email,
      password,
      mentionId,
      displayName
    });
  }
});
