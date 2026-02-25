import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { type User, userActions } from '@/entities/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>('login/loginByUsername', async (payload, thunkAPI) => {
  try {
    const response = await axios.post<User>(
      'http://localhost:8000/login',
      payload,
    )

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
