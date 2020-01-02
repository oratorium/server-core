import { GraphQLScalarType } from "graphql";
import Time from "dayjs";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === "number") {
      return new Date(value * 1000).toISOString();
    }
    if (typeof value === "string") {
      const time = Time(value);
      if (time.isValid()) {
        return time.toISOString();
      }
    }
    throw new Error("unexpected type");
  }
});
