import type { AxiosInstance } from 'axios'
import type { NavigateFunction } from 'react-router'
import type { RootState, AppDispatch } from './store'

interface ThunkExtraArgs {
  api: AxiosInstance
  nav?: NavigateFunction
}

export interface ThunkConfig {
  extra: ThunkExtraArgs
  rejectValue: string
  state: RootState
  dispatch: AppDispatch
}
