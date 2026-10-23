import { Navigate, useLocation } from 'react-router'
import { getUserAuthData } from '@/entities/user'
import { routesPaths } from '@/shared/config/routes'
import { useAppSelector } from '@/shared/lib/store'
import type { ReactNode } from 'react'
import type { UserRole } from '@/entities/user'

interface RequireAuthProps {
  children: ReactNode
  roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useAppSelector(getUserAuthData)
  const location = useLocation()

  if (!auth) {
    return (
      <Navigate
        to={routesPaths.about.path}
        state={{ from: location }}
        replace
      />
    )
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to={routesPaths.forbidden.path} replace />
  }

  return children
}
