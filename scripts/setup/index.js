const { initializeRepositories } = require("../../dist/repositories");
const { createTriggers } = require("./createTriggers");

const run = async () => {
  await initializeRepositories;
  await createTriggers();
};

run().finally(() => process.exit());
