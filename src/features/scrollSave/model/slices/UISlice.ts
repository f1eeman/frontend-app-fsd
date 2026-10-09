import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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
export const { reducer: uiReducer } = uiSlice
export const { getUIScrollByPath } = uiSlice.selectors
