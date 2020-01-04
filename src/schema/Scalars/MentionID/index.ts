import { GraphQLScalarType } from "graphql";

const pattern = /^[a-z_](?:[a-z0-9_]*)$/;

export const MentionID = new GraphQLScalarType({
  name: "MentionID",
  serialize(value) {
    if (typeof value === "string") {
      return value;
    }
    throw new Error("unexpected type");
  },
  parseLiteral(node) {
    if (node.kind === "StringValue") {
      if (pattern.test(node.value)) {
        return node.value;
      }
      throw new Error("unexpected format");
    }
    throw new Error("unexpected type");
  },
  parseValue(value) {
    if (typeof value === "string") {
      if (pattern.test(value)) {
        return value;
      }
      throw new Error("unexpected format");
    }
    throw new Error("unexpected type");
  }
});
