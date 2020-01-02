type primitive = null | boolean | number | string;

export const dedent = ([head, ...tail]: TemplateStringsArray, ...rest: primitive[]) => {
  const dedentResult = tail.reduce((result, current, index) => result + rest[index] + current, head);
  const matchArray = dedentResult.match(/\| (.+)/g) || [];
  return matchArray.map(token => token.slice(2)).join("\n");
};
