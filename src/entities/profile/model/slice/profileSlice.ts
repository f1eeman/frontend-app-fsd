import { createSlice } from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { rootReducer } from '@/app/store'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import type { Profile, ProfileSchema } from '../types/profile'

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    selectProfileError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
    selectProfileData: (state) => state.data,
  },
})

export const withProfileSlice = profileSlice.injectInto(rootReducer)

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
export const { selectProfileError, selectIsLoading, selectProfileData } =
  withProfileSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}
