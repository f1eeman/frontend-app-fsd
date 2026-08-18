import {
  combineSlices,
  configureStore,
  type Reducer,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
} from '@reduxjs/toolkit'
import { userReducer } from '@/entities/user'
import { uiReducer } from '@/features/scrollSave'
import { $api } from '@/shared/api/api'
import { baseRtkApi } from '@/shared/api/rtkApi'
import type { AxiosInstance } from 'axios'
import type { DeepPartial } from '@/shared/types'

export interface ThunkExtraArgs {
  api: AxiosInstance
}

export interface LazyLoadedSlices {}

export type RootState = ReturnType<typeof rootReducer>

type DefaultMiddleware = Tuple<
  [ThunkMiddleware<RootState, UnknownAction, ThunkExtraArgs>]
>

type AppMiddleware = Tuple<
  [
    ThunkMiddleware<RootState, UnknownAction, ThunkExtraArgs>,
    typeof baseRtkApi.middleware,
  ]
>

export const rootReducer = combineSlices({
  user: userReducer,
  ui: uiReducer,
  [baseRtkApi.reducerPath]: baseRtkApi.reducer,
}).withLazyLoadedSlices<LazyLoadedSlices>()

export function setupStore(preloadedState?: DeepPartial<RootState>) {
  return configureStore<RootState, UnknownAction, AppMiddleware>({
    reducer: rootReducer as Reducer<RootState>,
    preloadedState: preloadedState as RootState | undefined,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      (
        getDefaultMiddleware({
          thunk: {
            extraArgument: {
              api: $api,
            } satisfies ThunkExtraArgs,
          },
        }) as DefaultMiddleware
      ).concat(baseRtkApi.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
