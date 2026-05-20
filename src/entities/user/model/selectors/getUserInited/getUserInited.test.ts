import { getUserInited } from './getUserInited'
import type { RootState } from '@/app/store'

describe('getUserInited.test', () => {
  test('should return true when app is inited', () => {
    const state = {
      user: { _inited: true },
    } as unknown as RootState

    expect(getUserInited(state)).toBe(true)
  })

  test('should return false when app is not inited', () => {
    const state = {
      user: { _inited: false },
    } as unknown as RootState

    expect(getUserInited(state)).toBe(false)
  })
})
