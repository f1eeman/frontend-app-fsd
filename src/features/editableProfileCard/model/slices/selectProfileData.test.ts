import { selectProfileData } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectProfileData.test', () => {
  test('should return data', () => {
    const data = {
      first: 'John',
      lastname: 'Doe',
      age: 30,
    }
    const state = {
      profile: {
        data,
      },
    }
    expect(selectProfileData(state as RootState)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectProfileData(state as RootState)).toEqual(undefined)
  })
})
