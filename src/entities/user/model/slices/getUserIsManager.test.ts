import { userRole } from '../consts/consts'
import { getUserIsManager } from './userSlice'
import type { RootState } from '@/app/store'

const createState = (role?: string) =>
  ({
    user: {
      authData: role ? { id: '1', username: 'admin', role } : undefined,
      _inited: true,
    },
  }) as unknown as RootState

describe('getUserIsManager.test', () => {
  test('should return true for manager', () => {
    expect(getUserIsManager(createState(userRole.MANAGER))).toBe(true)
  })

  test('should return false for other role', () => {
    expect(getUserIsManager(createState(userRole.USER))).toBe(false)
  })

  test('should return false when user is not logged in', () => {
    expect(getUserIsManager(createState())).toBe(false)
  })
})
