import DataLoader from "dataloader";

import { DocumentRepository } from "../../repositories/Document";
import { DocumentFragmentRepository } from "../../repositories/DocumentFragment";
import { PreferenceRepository } from "../../repositories/Preference";
import { UserRepository } from "../../repositories/User";
import { createBatcher } from "./createBatcher";
import { createQueryRunner } from "./createQueryRunner";

export const createLoaders = () => ({
  document: new DataLoader(createBatcher(DocumentRepository, item => item.id)),
  documentFragment: new DataLoader(createBatcher(DocumentFragmentRepository, item => item.id)),
  preference: new DataLoader(createBatcher(PreferenceRepository, item => item.id)),
  query: createQueryRunner(),
  user: new DataLoader(createBatcher(UserRepository, item => item.id))
});
