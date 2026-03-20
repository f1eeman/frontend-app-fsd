import { selectProfileError } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectProfileError.test', () => {
  test('should return error', () => {
    const state = {
      profile: {
        error: '123',
      },
    }
    expect(selectProfileError(state as RootState)).toEqual('123')
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectProfileError(state as RootState)).toEqual(undefined)
  })
})
