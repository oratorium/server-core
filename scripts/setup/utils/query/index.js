const { getConnection } = require("typeorm");

module.exports.query = async (query, parameterList) => {
  await getConnection().query(query, parameterList);
};
