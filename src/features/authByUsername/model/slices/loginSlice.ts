import { createSlice, type WithSlice } from '@reduxjs/toolkit'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'
import { rootReducer } from '@/app/store'
import type { LoginSchema, ReducerFuncType } from '../types/loginSchema'

const initialState: LoginSchema = {
  isLoading: false,
  username: '',
  password: '',
}

const setUsername: ReducerFuncType<string> = (state, { payload }) => {
  state.username = payload
}

const setPassword: ReducerFuncType<string> = (state, { payload }) => {
  state.password = payload
}

const reducers = {
  setUsername,
  setPassword,
} as const

export const loginSlice = createSlice({
  name: 'login',
  reducerPath: 'login',
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
  selectors: {
    selectLoginError: (state) => state.error,
    selectIsLoading: (state) => state.isLoading,
    selectPassword: (state) => state.password,
    selectUsername: (state) => state.username,
  },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice

export const withLoginSlice = loginSlice.injectInto(rootReducer)

export const {
  selectLoginError,
  selectIsLoading,
  selectPassword,
  selectUsername,
} = withLoginSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof loginSlice> {}
}
