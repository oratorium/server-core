const { configs } = require("../../../../dist/configs");
const { dedent } = require("../dedent");
const { query } = require("../query");

/**
 * @param {object} option
 * @param {string} option.name
 * @param {string} option.table
 * @param {'INSERT' | 'UPDATE' | 'DELETE'} option.event
 * @param {'BEFORE' | 'AFTER'} option.timing
 * @param {string} option.statement
 */
const createTrigger = async option => {
  const { name, table, event, timing, statement } = option;
  const header = dedent`
    | DROP TRIGGER IF EXISTS \`${configs.databaseConnectionOptions.database}\`.\`${name}\`;
    |
    | CREATE TRIGGER \`${name}\` ${timing} ${event}
    | ON \`${configs.databaseConnectionOptions.database}\`.\`${table}\`
    | FOR EACH ROW
  `;
  await query(`${header}\n${statement}`);
};

/**
 *
 * @param {'INSERT' | 'UPDATE' | 'DELETE'} event
 * @param {'BEFORE' | 'AFTER'} timing
 */
const buildTrigger = (event, timing) => {
  /**
   * @param {string} name
   * @param {string} table
   * @param {string} statement
   */
  const trigger = (name, table, statement) => () => createTrigger({ name, table, event, timing, statement });
  return trigger;
};

module.exports.beforeInsert = buildTrigger("INSERT", "BEFORE");
module.exports.afterInsert = buildTrigger("INSERT", "AFTER");
module.exports.beforeUpdate = buildTrigger("UPDATE", "BEFORE");
module.exports.afterUpdate = buildTrigger("UPDATE", "AFTER");
module.exports.beforeDelete = buildTrigger("DELETE", "BEFORE");
module.exports.afterDelete = buildTrigger("DELETE", "AFTER");
