import type { RootState, AppDispatch, ThunkExtraArgs } from '@/app/store/store'

export interface ThunkConfig<T> {
  extra: ThunkExtraArgs
  rejectValue: T
  state: RootState
  dispatch: AppDispatch
}
