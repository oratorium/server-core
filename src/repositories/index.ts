import { createConnection } from "typeorm";

import { configs } from "../configs";
import { AttachmentRepository } from "./Attachment";
import { CommentRepository } from "./Comment";
import { CommentHashtagRepository } from "./CommentHashtag";
import { DocumentRepository } from "./Document";
import { DocumentFragmentRepository } from "./DocumentFragment";
import { HashtagRepository } from "./Hashtag";
import { KindRepository } from "./Kind";
import { PreferenceRepository } from "./Preference";
import { UniverseRepository } from "./Universe";
import { UserRepository } from "./User";

const createDatabaseIfNotExists = async () => {
  const connectionOptions = { ...configs.databaseConnectionOptions, database: "" };
  const connection = await createConnection(connectionOptions);
  await connection.query(`
    CREATE DATABASE IF NOT EXISTS ${configs.databaseConnectionOptions.database}
    DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
  `);
  await connection.close();
};

const synchorinzeRepositories = async () => {
  const entities = [
    AttachmentRepository,
    CommentRepository,
    CommentHashtagRepository,
    DocumentRepository,
    DocumentFragmentRepository,
    HashtagRepository,
    KindRepository,
    PreferenceRepository,
    UniverseRepository,
    UserRepository
  ];
  const connectionOption = { ...configs.databaseConnectionOptions, entities };
  const connection = await createConnection(connectionOption);
  await connection.synchronize();
};

export const initializeRepositories = (async () => {
  await createDatabaseIfNotExists();
  await synchorinzeRepositories();
})();
