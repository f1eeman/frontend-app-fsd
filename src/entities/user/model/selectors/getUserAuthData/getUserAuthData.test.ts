import { getUserAuthData } from './getUserAuthData'
import type { RootState } from '@/app/store'

describe('getUserAuthData.test', () => {
  test('should return authData when user is logged in', () => {
    const state = {
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    } as unknown as RootState

    expect(getUserAuthData(state)).toEqual({ id: '1', username: 'admin' })
  })

  test('should return undefined when user is not logged in', () => {
    const state = {
      user: { authData: undefined, _inited: true },
    } as unknown as RootState

    expect(getUserAuthData(state)).toBeUndefined()
  })
})
