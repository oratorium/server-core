import { createAuth } from "./createAuth";

export type Context = ReturnType<typeof createContext>;

type Option = { authorization?: string };

export const createContext = ({ authorization }: Option) => ({
  auth: createAuth(authorization)
});
