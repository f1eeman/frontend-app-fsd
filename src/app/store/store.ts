import {
  configureStore,
  type Reducer,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction,
} from '@reduxjs/toolkit'
import { $api } from '@/shared/api/api'
import { baseRtkApi } from '@/shared/api/rtkApi'
import {
  rootReducer,
  type RootState,
  type ThunkExtraArgs,
} from '@/shared/lib/store'
import type { DeepPartial } from '@/shared/types'

type DefaultMiddleware = Tuple<
  [ThunkMiddleware<RootState, UnknownAction, ThunkExtraArgs>]
>

type AppMiddleware = Tuple<
  [
    ThunkMiddleware<RootState, UnknownAction, ThunkExtraArgs>,
    typeof baseRtkApi.middleware,
  ]
>

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
