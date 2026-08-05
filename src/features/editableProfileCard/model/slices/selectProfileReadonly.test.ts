import { selectProfileReadonly } from './profileSlice'
import type { RootState } from '@/app/store'

describe('selectProfileReadonly.test', () => {
  test('should return readonly status', () => {
    const state = {
      profile: {
        readonly: true,
      },
    }
    expect(selectProfileReadonly(state as RootState)).toEqual(true)
  })
  test('should work with empty state', () => {
    const state = {
      profile: {},
    }
    expect(selectProfileReadonly(state as RootState)).toEqual(undefined)
  })
})
