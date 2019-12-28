import { GraphQLScalarType } from "graphql";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "number") {
      return new Date(value * 1000).toISOString();
    }
    throw new Error("unexpected type");
  }
});
