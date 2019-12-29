import DataLoader from "dataloader";

import { PreferenceRepository } from "../../repositories/Preference";
import { UserRepository } from "../../repositories/User";
import { createBatcher } from "./createBatcher";
import { createQueryRunner } from "./createQueryRunner";

export const createLoaders = () => ({
  preference: new DataLoader(createBatcher(PreferenceRepository, item => item.id)),
  query: createQueryRunner(),
  user: new DataLoader(createBatcher(UserRepository, item => item.id))
});
