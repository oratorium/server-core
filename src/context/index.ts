import { createAuth } from "./createAuth";
import { createLoaders } from "./createLoaders";

export type Context = ReturnType<typeof createContext>;

type Option = { authorization?: string };

export const createContext = ({ authorization }: Option) => ({
  auth: createAuth(authorization),
  loaders: createLoaders()
});
