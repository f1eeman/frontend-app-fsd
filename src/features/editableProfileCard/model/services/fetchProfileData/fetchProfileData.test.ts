import { fetchProfileData } from './fetchProfileData'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Profile } from '../../types/profile'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'admin',
  first: 'asd',
  city: 'asf',
  currency: Currency.USD,
}

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Profile, void, string>(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error login', async () => {
    const thunk = new TestAsyncThunk<Profile, void, string>(fetchProfileData)
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
  })
})
