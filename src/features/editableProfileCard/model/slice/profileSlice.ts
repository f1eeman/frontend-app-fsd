import { createSlice } from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { rootReducer } from '@/app/store'
import type { PayloadAction, WithSlice } from '@reduxjs/toolkit'
import type { Profile, ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: null,
  data: null,
  form: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    cancelEdit: (state) => {
      state.readonly = true
      state.form = state.data
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
        },
      )
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? null
      })
      .addCase(updateProfileData.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
          state.readonly = true
        },
      )
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? null
      })
  },
  selectors: {
    selectProfileError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
    selectProfileData: (state) => state.data,
    selectProfileReadonly: (state) => state.readonly,
    selectProfileForm: (state) => state.form ?? {},
  },
})

export const withProfileSlice = profileSlice.injectInto(rootReducer)

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
export const {
  selectProfileError,
  selectIsLoading,
  selectProfileData,
  selectProfileReadonly,
  selectProfileForm,
} = withProfileSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof profileSlice> {}
}
