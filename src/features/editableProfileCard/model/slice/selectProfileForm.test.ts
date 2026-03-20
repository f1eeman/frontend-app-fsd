import { selectProfileForm } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectProfileForm.test', () => {
  test('should return form data', () => {
    const data = {
      first: 'John',
      lastname: 'Doe',
      age: 30,
    }
    const state = {
      profile: {
        form: data,
      },
    }
    expect(selectProfileForm(state as RootState)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectProfileForm(state as RootState)).toEqual({})
  })
})
