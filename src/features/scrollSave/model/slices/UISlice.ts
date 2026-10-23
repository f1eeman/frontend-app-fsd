import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/shared/lib/store'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import type { UISchema } from '../types/UISchema'

const initialState: UISchema = {
  scroll: {},
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position
    },
  },
  selectors: {
    getUIScrollByPath: (state, path: string) => state.scroll[path] || 0,
  },
})

// Action creators are generated for each case reducer function
export const { actions: uiActions } = uiSlice
export const withUISlice = uiSlice.injectInto(rootReducer)

export const { getUIScrollByPath } = withUISlice.selectors

declare module '@/shared/lib/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof uiSlice> {}
}
