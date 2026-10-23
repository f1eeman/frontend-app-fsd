import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Profile } from '@/entities/profile'
import type { ThunkConfig } from '@/shared/lib/store'

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
>('profile/fetchProfileData', async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Profile>(`/profile/${id}`, {
      signal: thunkApi.signal,
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
