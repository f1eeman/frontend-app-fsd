import { selectIsLoading } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectIsLoading.test', () => {
  test('should return loading status', () => {
    const state = {
      profile: {
        isLoading: true,
      },
    }
    expect(selectIsLoading(state as RootState)).toEqual(true)
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectIsLoading(state as RootState)).toEqual(undefined)
  })
})
