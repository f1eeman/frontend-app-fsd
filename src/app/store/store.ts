import { combineSlices, configureStore } from '@reduxjs/toolkit'
// import { userReducer } from 'entities/user'
import type { DeepPartial } from '@/shared/types'

export const rootReducer = combineSlices({
  // user: userReducer,
}).withLazyLoadedSlices<LazyLoadedSlices>()

export function setupStore(preloadedState?: DeepPartial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: __IS_DEV__,
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']

export interface LazyLoadedSlices {}
