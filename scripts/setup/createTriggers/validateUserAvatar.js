const { afterInsert, afterUpdate } = require("../utils/trigger");
const { dedent } = require("../utils/dedent");

module.exports.validateUserAvatar = async () => {
  const statement = dedent`
    | IF (
    |   SELECT SUM(\`UA\`.\`isCurrent\`)
    |   FROM \`UserAvatar\` \`UA\`
    |   WHERE \`UA\`.\`userId\` = \`NEW\`.\`userId\`
    | ) > 1
    | THEN
    |   SIGNAL SQLSTATE '45000'
    |   SET MESSAGE_TEXT = '현재 이미지는 1개만 지정할 수 있습니다.';
    | END IF;
  `;
  await afterInsert("validateUserAvatarOnAfterInsert", "UserAvatar", statement)();
  await afterUpdate("validateUserAvatarOnAfterUpdate", "UserAvatar", statement)();
};
