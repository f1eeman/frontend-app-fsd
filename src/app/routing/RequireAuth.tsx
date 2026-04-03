import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '@/app/store'
import { getUserAuthData } from '@/entities/user'
import { routesPaths } from '@/shared/config/routes'
import type { ReactNode } from 'react'

export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAppSelector(getUserAuthData)
  const location = useLocation()

  if (!auth) {
    return (
      <Navigate to={routesPaths.root.path} state={{ from: location }} replace />
    )
  }

  return children
}
