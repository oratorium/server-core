import { printSchema } from "graphql";

import { initializeRepositories } from "./repositories";
import { schema } from "./schema";

const run = async () => {
  await initializeRepositories;
  console.log(printSchema(schema));
  process.exit();
};

run();
