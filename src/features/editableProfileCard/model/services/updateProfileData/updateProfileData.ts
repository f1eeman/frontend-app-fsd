import { createAsyncThunk } from '@reduxjs/toolkit'
import { ValidateProfileError } from '../../types/profile'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import type { ThunkConfig } from '@/app/store'
import type { Profile } from '@/entities/profile'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData: Profile = getState().profile?.form ?? {}

  const errors = validateProfileData(formData)

  if (errors.length) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>(
      `/profile/${formData?.id}`,
      formData,
    )

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch {
    return rejectWithValue([ValidateProfileError.SERVER_ERROR])
  }
})
