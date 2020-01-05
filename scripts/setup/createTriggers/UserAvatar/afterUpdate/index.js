const { validateUserAvatarOnAfterUpdate } = require("./validateUserAvatarOnAfterUpdate");

module.exports.afterUpdate = () => Promise.all([validateUserAvatarOnAfterUpdate()]);
