import { GraphQLScalarType } from "graphql";

import { dedent } from "../../lib/dedent";

const MINIMUM = 0;
const MAXIMUM = 100;

export const PageInt = new GraphQLScalarType({
  name: "PageInt",
  description: dedent`
    | ${MINIMUM} 이상 ${MAXIMUM} 이하의 숫자 형식입니다.  
  `,
  serialize(value) {
    if (typeof value === "number") {
      if (Math.max(MINIMUM, Math.min(MAXIMUM, value)) === value) {
        return value;
      }
      throw new Error(`${MINIMUM}페이지부터 ${MAXIMUM}페이지까지만 조회할 수 있습니다.`);
    }
    throw new Error("숫자 형식만 입력할 수 있습니다.");
  },
  parseLiteral(node) {
    if (node.kind === "IntValue") {
      const value = +node.value;
      if (Math.max(MINIMUM, Math.min(MAXIMUM, value)) === value) {
        return value;
      }
      throw new Error(`${MINIMUM}페이지부터 ${MAXIMUM}페이지까지만 조회할 수 있습니다.`);
    }
    throw new Error("숫자 형식만 입력할 수 있습니다.");
  },
  parseValue(value) {
    if (typeof value === "number") {
      if (Math.max(MINIMUM, Math.min(MAXIMUM, value)) === value) {
        return value;
      }
      throw new Error(`${MINIMUM}페이지부터 ${MAXIMUM}페이지까지만 조회할 수 있습니다.`);
    }
    throw new Error("숫자 형식만 입력할 수 있습니다.");
  }
});
