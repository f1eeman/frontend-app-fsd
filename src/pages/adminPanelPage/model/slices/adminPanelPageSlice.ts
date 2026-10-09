import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import type { AdminPanelPageSchema } from '../types/adminPanelPageSchema'

const initialState: AdminPanelPageSchema = {
  isLoading: false,
}

const adminPanelPageSlice = createSlice({
  name: 'adminPanelPage',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
  },
})

export const withAdminPanelPageSlice =
  adminPanelPageSlice.injectInto(rootReducer)
export const { actions: adminPanelPageActions } = adminPanelPageSlice
export const { reducer: adminPanelPageReducer } = adminPanelPageSlice
export const { selectIsLoading, selectError } =
  withAdminPanelPageSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof adminPanelPageSlice> {}
}
