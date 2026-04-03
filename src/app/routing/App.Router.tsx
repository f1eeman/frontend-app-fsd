import { useRoutes } from 'react-router'
import { RequireAuth } from './RequireAuth'
import { routesConfig } from '@/shared/config/routes'
import type { RouteObject } from 'react-router'

function applyAuth(routes: AppRouteObject[]): RouteObject[] {
  return routes.map(({ authOnly, children, ...route }) => {
    const result: RouteObject = {
      ...route,
      element: authOnly ? (
        <RequireAuth>{route.element}</RequireAuth>
      ) : (
        route.element
      ),
    }
    if (children) {
      result.children = applyAuth(children)
    }
    return result
  })
}

const AppRoutes = () => {
  const element = useRoutes(applyAuth(routesConfig))
  return element
}

export const AppRouter = () => {
  return <AppRoutes />
}
