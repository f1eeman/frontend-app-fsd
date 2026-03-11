import type { AxiosInstance } from 'axios'
import type { NavigateFunction } from 'react-router'
import type { RootState, AppDispatch } from './store'

interface ThunkExtraArgs {
  api: AxiosInstance
  nav?: NavigateFunction
}

export interface ThunkConfig<T> {
  extra: ThunkExtraArgs
  rejectValue: T
  state: RootState
  dispatch: AppDispatch
}
