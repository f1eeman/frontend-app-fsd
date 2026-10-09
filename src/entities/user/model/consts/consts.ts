export const userRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MANAGER: 'MANAGER',
} as const

type UserRoleKey = keyof typeof userRole
export type UserRole = (typeof userRole)[UserRoleKey]
