import { createAsyncThunk } from '@reduxjs/toolkit'
import { type User, userActions } from '@/entities/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { ThunkConfig } from '@/app/store'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (payload, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.post<User>('/login', payload)

    if (!response.data) {
      throw new Error('Failed to authorize')
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
    thunkAPI.dispatch(userActions.setAuthData(response.data))

    return response.data
  } catch (_e) {
    return thunkAPI.rejectWithValue('Вы ввели неверный логин или пароль')
  }
})
