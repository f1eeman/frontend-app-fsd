import { useRoutes } from 'react-router'
import { RequireAuth } from './RequireAuth'
import { AboutPageAsync } from '@/pages/aboutPage'
import { MainPageAsync } from '@/pages/mainPage'
import { NotFoundPage } from '@/pages/notFoundPage'
import { ProfilePageAsync } from '@/pages/profilePage'
import { routesPaths } from '@/shared/config/routes'
import type { RouteObject } from 'react-router'

type AppRouteObject = RouteObject & {
  authOnly?: boolean
  children?: AppRouteObject[]
}

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

const routesConfig: AppRouteObject[] = [
  {
    element: <MainPageAsync />,
    path: routesPaths.root.path,
    id: routesPaths.root.id,
    children: [
      {
        element: <AboutPageAsync />,
        path: routesPaths.about.path,
        id: routesPaths.about.id,
      },
      {
        authOnly: true,
        element: <ProfilePageAsync />,
        path: routesPaths.profile.path,
        id: routesPaths.profile.id,
      },
      {
        element: <NotFoundPage />,
        path: routesPaths.not_found.path,
        id: routesPaths.not_found.id,
      },
    ],
  },
]

const AppRoutes = () => {
  const element = useRoutes(applyAuth(routesConfig))
  return element
}

export const AppRouter = () => {
  return <AppRoutes />
}
