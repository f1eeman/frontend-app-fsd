import type { RootState, AppDispatch, ThunkExtraArgs } from './store'

export interface ThunkConfig<T> {
  extra: ThunkExtraArgs
  rejectValue: T
  state: RootState
  dispatch: AppDispatch
}
