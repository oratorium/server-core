const dotenv = require("dotenv");
const typeChecker = require("./typeChecker");

dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.production" });
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

typeChecker.valid("PORT", "port");

typeChecker.valid("DATABASE_CONNECTION_HOST", "string");
typeChecker.valid("DATABASE_CONNECTION_PORT", "port");
typeChecker.valid("DATABASE_CONNECTION_USERNAME", "string");
typeChecker.valid("DATABASE_CONNECTION_PASSWORD", "string");
typeChecker.valid("DATABASE_CONNECTION_DATABASE", "string");
