import { createSlice } from '@reduxjs/toolkit'
import { rootReducer } from '@/app/store'
import type { WithSlice } from '@reduxjs/toolkit'
import type { ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export const withProfileSlice = profileSlice.injectInto(rootReducer)

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice

declare module '@/app/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}
