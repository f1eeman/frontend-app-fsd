import { userRole } from '../consts/consts'
import { getUserIsUser } from './userSlice'
import type { RootState } from '@/app/store'

const createState = (role?: string) =>
  ({
    user: {
      authData: role ? { id: '1', username: 'admin', role } : undefined,
      _inited: true,
    },
  }) as unknown as RootState

describe('getUserIsUser.test', () => {
  test('should return true for user', () => {
    expect(getUserIsUser(createState(userRole.USER))).toBe(true)
  })

  test('should return false for other role', () => {
    expect(getUserIsUser(createState(userRole.ADMIN))).toBe(false)
  })

  test('should return false when user is not logged in', () => {
    expect(getUserIsUser(createState())).toBe(false)
  })
})
