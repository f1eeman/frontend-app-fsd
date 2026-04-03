import {
  combineSlices,
  configureStore,
  type Reducer,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
} from '@reduxjs/toolkit'
import { userReducer } from '@/entities/user'
import { $api } from '@/shared/api/api'
import type { AxiosInstance } from 'axios'
import type { NavigateFunction } from 'react-router'
import type { DeepPartial } from '@/shared/types'

export interface ThunkExtraArgs {
  api: AxiosInstance
  nav: NavigateFunction | undefined
}

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices({
  user: userReducer,
}).withLazyLoadedSlices<LazyLoadedSlices>()

export type RootState = ReturnType<typeof rootReducer>

type AppMiddleware = Tuple<
  [ThunkMiddleware<RootState, UnknownAction, ThunkExtraArgs>]
>

export function setupStore(
  preloadedState?: DeepPartial<RootState>,
  nav?: NavigateFunction,
) {
  return configureStore<RootState, UnknownAction, AppMiddleware>({
    reducer: rootReducer as Reducer<RootState>,
    preloadedState: preloadedState as RootState | undefined,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            nav,
          } satisfies ThunkExtraArgs,
        },
      }) as AppMiddleware,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
