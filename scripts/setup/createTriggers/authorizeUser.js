const { afterUpdate } = require("../utils/trigger");
const { dedent } = require("../utils/dedent");

module.exports.authorizeUser = afterUpdate(
  "authorizeUser",
  "UserAccount",
  dedent`
    | UPDATE \`User\` \`U\`
    |
    | INNER JOIN (
    |   SELECT
    |     SUM(\`UA\`.\`isAuthorized\`) != 0 AS \`isAuthorized\`
    |   FROM \`UserAccount\` \`UA\`
    |   WHERE \`UA\`.\`userId\` = \`NEW\`.\`userId\`
    |   LIMIT 1
    | ) \`UAS\`
    |
    | SET \`U\`.\`isAuthorized\` = \`UAS\`.\`isAuthorized\`
    |
    | WHERE \`U\`.\`id\` = \`NEW\`.\`userId\`;
  `
);
