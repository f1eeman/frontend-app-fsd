export const isOneOf = <T extends string>(
  values: readonly T[],
  value: string | null,
): value is T => values.some((item) => item === value)
