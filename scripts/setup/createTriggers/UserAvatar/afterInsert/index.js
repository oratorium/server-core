const { validateUserAvatarOnAfterInsert } = require("./validateUserAvatarOnAfterInsert");

module.exports.afterInsert = () => Promise.all([validateUserAvatarOnAfterInsert()]);
