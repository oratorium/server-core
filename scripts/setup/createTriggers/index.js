const { authorizeUser } = require("./authorizeUser");

module.exports.createTriggers = async () => {
  await Promise.all([authorizeUser()]);
};
