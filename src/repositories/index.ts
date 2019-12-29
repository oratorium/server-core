import { createConnection } from "typeorm";

import { configs } from "../configs";
import { PreferenceRepository } from "./Preference";
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
  const entities = [PreferenceRepository, UserRepository];
  const connectionOption = { ...configs.databaseConnectionOptions, entities };
  const connection = await createConnection(connectionOption);
  await connection.synchronize();
};

export const initializeRepositories = (async () => {
  await createDatabaseIfNotExists();
  await synchorinzeRepositories();
})();
