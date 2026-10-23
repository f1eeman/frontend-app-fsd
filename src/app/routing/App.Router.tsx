import { useRoutes } from 'react-router'
import { RequireAuth } from './RequireAuth'
import { routesConfig } from './routesConfig'
import type { RouteObject } from 'react-router'
import type { AppRouteObject } from './routesConfig'

function applyAuth(routes: AppRouteObject[]): RouteObject[] {
  return routes.map(({ authOnly, roles, children, ...route }) => {
    const result: RouteObject = {
      ...route,
      element:
        authOnly || roles ? (
          <RequireAuth roles={roles}>{route.element}</RequireAuth>
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
