const { authorizeUser } = require("./authorizeUser");
const { validateUserAvatar } = require("./validateUserAvatar");

module.exports.createTriggers = async () => {
  await Promise.all([authorizeUser(), validateUserAvatar()]);
};
