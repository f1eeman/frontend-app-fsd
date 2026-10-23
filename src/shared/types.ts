type DeepPartialValue<T> = T extends object ? DeepPartial<T> : T

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartialValue<T[P]>
}

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type SortOrder = 'asc' | 'desc'
