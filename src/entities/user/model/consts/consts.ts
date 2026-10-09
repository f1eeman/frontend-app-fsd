export const userRole = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
} as const

type UserRoleKey = keyof typeof userRole
export type UserRole = (typeof userRole)[UserRoleKey]
