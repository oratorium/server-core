const { beforeInsert } = require("./beforeInsert");
const { beforeUpdate } = require("./beforeUpdate");
const { beforeDelete } = require("./beforeDelete");
const { afterInsert } = require("./afterInsert");
const { afterUpdate } = require("./afterUpdate");
const { afterDelete } = require("./afterDelete");

module.exports.UserAccount = () =>
  Promise.all([beforeInsert(), beforeUpdate(), beforeDelete(), afterInsert(), afterUpdate(), afterDelete()]);
