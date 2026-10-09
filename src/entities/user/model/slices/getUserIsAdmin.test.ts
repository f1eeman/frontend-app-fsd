import { userRole } from '../consts/consts'
import { getUserIsAdmin } from './userSlice'
import type { RootState } from '@/app/store'

const createState = (role?: string) =>
  ({
    user: {
      authData: role ? { id: '1', username: 'admin', role } : undefined,
      _inited: true,
    },
  }) as unknown as RootState

describe('getUserIsAdmin.test', () => {
  test('should return true for admin', () => {
    expect(getUserIsAdmin(createState(userRole.ADMIN))).toBe(true)
  })

  test('should return false for other role', () => {
    expect(getUserIsAdmin(createState(userRole.USER))).toBe(false)
  })

  test('should return false when user is not logged in', () => {
    expect(getUserIsAdmin(createState())).toBe(false)
  })
})
