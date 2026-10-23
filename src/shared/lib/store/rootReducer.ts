import { combineSlices } from '@reduxjs/toolkit'
import { baseRtkApi } from '@/shared/api/rtkApi'

export interface LazyLoadedSlices {}

export const rootReducer =
  combineSlices(baseRtkApi).withLazyLoadedSlices<LazyLoadedSlices>()

export type RootState = ReturnType<typeof rootReducer>
