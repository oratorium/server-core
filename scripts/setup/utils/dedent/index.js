module.exports.dedent = ([head, ...tail], ...rest) => {
  const dedentResult = tail.reduce((result, current, index) => result + rest[index] + current, head);
  const matchArray = dedentResult.match(/\| (.+)/g) || [];
  return matchArray.map(token => token.slice(2)).join("\n");
};
