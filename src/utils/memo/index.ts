export const memo = <T>(initializer: () => T) => {
  let value: T;
  return () => value ?? (value = initializer());
};
