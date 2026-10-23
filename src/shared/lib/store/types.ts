import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import type { AxiosInstance } from 'axios'
import type { RootState } from './rootReducer'

export interface ThunkExtraArgs {
  api: AxiosInstance
}

export type AppDispatch = ThunkDispatch<
  RootState,
  ThunkExtraArgs,
  UnknownAction
>

export interface ThunkConfig<T> {
  extra: ThunkExtraArgs
  rejectValue: T
  state: RootState
  dispatch: AppDispatch
}
