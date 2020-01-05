const { User } = require("./User");
const { UserAccount } = require("./UserAccount");
const { UserAvatar } = require("./UserAvatar");

module.exports.createTriggers = () => Promise.all([User(), UserAccount(), UserAvatar()]);
