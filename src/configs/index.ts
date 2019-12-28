import { ConnectionOptions } from "typeorm";

const databaseConnectionOptions: ConnectionOptions = {
  type: "mariadb",
  host: process.env.DATABASE_CONNECTION_HOST!,
  port: +process.env.DATABASE_CONNECTION_PORT!,
  username: process.env.DATABASE_CONNECTION_USERNAME!,
  password: process.env.DATABASE_CONNECTION_PASSWORD!,
  database: process.env.DATABASE_CONNECTION_DATABASE!,
  charset: "utf8",
  timezone: "+0.00",
  logging: true
};

export const configs = {
  port: +process.env.PORT!,
  databaseConnectionOptions
};
