const { authorizeUser } = require("./authorizeUser");

module.exports.afterUpdate = () => Promise.all([authorizeUser()]);
