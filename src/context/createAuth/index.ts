import { UserRepository } from "../../repositories/User";
import { memo } from "../../utils/memo";

type Payload = {
  user: {
    id: number;
  };
};

export const createAuth = (authorization?: string) =>
  memo(() => {
    if (!authorization) {
      throw new Error("로그인 상태가 아닙니다");
    }
    const payload = UserRepository.parseToken<Payload>(authorization);
    if (!payload) {
      throw new Error("로그인 상태가 아닙니다");
    }
    return payload;
  });
