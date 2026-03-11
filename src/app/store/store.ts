import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { userReducer } from '@/entities/user'
import { $api } from '@/shared/api/api'
import type { NavigateFunction } from 'react-router'
import type { DeepPartial } from '@/shared/types'

export const rootReducer = combineSlices({
  user: userReducer,
}).withLazyLoadedSlices<LazyLoadedSlices>()

export function setupStore(
  preloadedState?: DeepPartial<RootState>,
  nav?: NavigateFunction,
) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api,
            nav,
          },
        },
      }),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ReturnType<typeof setupStore>['dispatch']

export interface LazyLoadedSlices {}
