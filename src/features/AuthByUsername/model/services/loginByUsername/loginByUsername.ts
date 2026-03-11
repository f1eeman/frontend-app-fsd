import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User, userActions } from '@/entities/user'
import { routesPaths } from '@/shared/config/routes'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { ThunkConfig } from '@/app/store'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig
>('login/loginByUsername', async (payload, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.post<User>(
      'http://localhost:8000/login',
      payload,
    )

    if (!response.data) {
      throw new Error('Failed to authorize')
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    thunkAPI.dispatch(userActions.setAuthData(response.data))
    thunkAPI.extra.nav?.(routesPaths.profile.path)

    return response.data
  } catch (_e) {
    return thunkAPI.rejectWithValue('Вы ввели неверный логин или пароль')
  }
})
