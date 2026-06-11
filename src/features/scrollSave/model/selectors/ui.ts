import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export const getUIScroll = (state: RootState) => state.ui.scroll

export const getUIScrollByPath = createSelector(
  getUIScroll,
  (_state: RootState, path: string) => path,
  (scroll, path) => scroll[path] || 0,
)
