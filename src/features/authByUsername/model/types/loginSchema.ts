export interface LoginSchema {
  username: string
  password: string
  isLoading: boolean
  error?: string
}

export type ReducerPayloadType<T> = { payload: T }

export type ReducerFuncType<T> = (
  state: LoginSchema,
  action: ReducerPayloadType<T>,
) => void
