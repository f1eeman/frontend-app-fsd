import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { userRole } from '../consts/consts'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import { rootReducer } from '@/shared/lib/store'
import type { UserSchema, User } from '../types/user'

const initialState: UserSchema = {
  _inited: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (user) {
        state.authData = JSON.parse(user)
      }
      state._inited = true
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    },
  },
  selectors: {
    getUserAuthData: (state) => state.authData,
    getUserInited: (state) => state._inited,
    getUserRole: (state) => state.authData?.role,
    getUserIsAdmin: (state) => state.authData?.role === userRole.ADMIN,
    getUserIsUser: (state) => state.authData?.role === userRole.USER,
    getUserIsManager: (state) => state.authData?.role === userRole.MANAGER,
  },
})

export const { actions: userActions } = userSlice
export const withUserSlice = userSlice.injectInto(rootReducer)

export const {
  getUserAuthData,
  getUserInited,
  getUserRole,
  getUserIsAdmin,
  getUserIsUser,
  getUserIsManager,
} = withUserSlice.selectors

declare module '@/shared/lib/store' {
  export interface LazyLoadedSlices extends WithSlice<typeof userSlice> {}
}
