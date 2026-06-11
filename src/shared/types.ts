export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type SortOrder = 'asc' | 'desc'
