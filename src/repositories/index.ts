import { createConnection } from "typeorm";

import { configs } from "../configs";

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
  const entities = [];
  const connectionOption = { ...configs.databaseConnectionOptions, entities };
  const connection = await createConnection(connectionOption);
  await connection.synchronize();
};

export const initializeRepositories = (async () => {
  await createDatabaseIfNotExists();
  await synchorinzeRepositories();
})();
