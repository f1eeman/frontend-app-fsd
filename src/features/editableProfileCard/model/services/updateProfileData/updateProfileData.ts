import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectProfileForm } from '../../slice/profileSlice'
import { ValidateProfileError } from '../../types/profile'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import type { Profile } from '../../types/profile'
import type { ThunkConfig } from '@/app/store'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = selectProfileForm(getState())

  const errors = validateProfileData(formData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>('/profile', formData)

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    console.log(e)
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})
