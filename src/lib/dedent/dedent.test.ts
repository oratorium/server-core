// @ts-ignore

import { dedent } from "./dedent";

describe("dedent", () => {
  it("reduce", () => {
    const expected = "foo\nbar\nbaz";
    expect(dedent`
      | foo
      | bar
      | baz
    `).toEqual(expected);
  });
});
