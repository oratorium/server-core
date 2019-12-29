import { createLoaders } from "./createLoaders";

export type Context = ReturnType<typeof createContext>;

export const createContext = () => ({ loaders: createLoaders() });
