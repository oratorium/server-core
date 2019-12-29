import { ApolloServer } from "apollo-server-fastify";
import Fastify from "fastify";

import { configs } from "./configs";
import { createContext } from "./context";
import { initializeRepositories } from "./repositories";
import { schema } from "./schema";

const createServer = () => {
  const apolloServer = new ApolloServer({ schema, playground: true, context: createContext });
  const server = Fastify();
  server.register(apolloServer.createHandler({ cors: true }));
  return server;
};

const run = async () => {
  await initializeRepositories;
  await createServer().listen(configs.port);
  console.log("RUNNING");
};

run();
