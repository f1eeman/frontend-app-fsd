import { ValidateProfileError } from '../types/profile'
import { selectProfileValidateErrors } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectProfileValidateErrors.test', () => {
  test('should return validation errors array', () => {
    const errors = [
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_AGE,
    ]
    const state = {
      profile: {
        validateErrors: errors,
      },
    }
    expect(selectProfileValidateErrors(state as RootState)).toEqual(errors)
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectProfileValidateErrors(state as RootState)).toEqual(undefined)
  })
})
