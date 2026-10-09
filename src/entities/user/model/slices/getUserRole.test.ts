import { userRole } from '../consts/consts'
import { getUserRole } from './userSlice'
import type { RootState } from '@/app/store'

describe('getUserRole.test', () => {
  test('should return role when user is logged in', () => {
    const state = {
      user: {
        authData: { id: '1', username: 'admin', role: userRole.ADMIN },
        _inited: true,
      },
    } as unknown as RootState

    expect(getUserRole(state)).toBe(userRole.ADMIN)
  })

  test('should return undefined when user is not logged in', () => {
    const state = {
      user: { authData: undefined, _inited: true },
    } as unknown as RootState

    expect(getUserRole(state)).toBeUndefined()
  })
})
