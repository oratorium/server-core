import DataLoader from "dataloader";

import { DocumentRepository } from "../../repositories/Document";
import { DocumentFragmentRepository } from "../../repositories/DocumentFragment";
import { PreferenceRepository } from "../../repositories/Preference";
import { UserRepository } from "../../repositories/User";
import { createBatcher } from "./createBatcher";
import { createQueryRunner } from "./createQueryRunner";

export const createLoaders = () => ({
  document: new DataLoader(createBatcher(DocumentRepository, getId)),
  documentFragment: new DataLoader(createBatcher(DocumentFragmentRepository, getId)),
  preference: new DataLoader(createBatcher(PreferenceRepository, getId)),
  query: createQueryRunner(),
  user: new DataLoader(createBatcher(UserRepository, getId))
});

const getId = (item: { id: number | string }) => item.id;
