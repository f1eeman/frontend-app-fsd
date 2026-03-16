import { useRoutes } from 'react-router'
import { AboutPageAsync } from '@/pages/aboutPage/AboutPage.async'
import { MainPageAsync } from '@/pages/mainPage/MainPage.async'
import { NotFoundPage } from '@/pages/notFoundPage'
import { ProfilePageAsync } from '@/pages/profilePage'
import { routesPaths } from '@/shared/config/routes'
import type { RouteObject } from 'react-router'

const routesConfig: RouteObject[] = [
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
  const element = useRoutes(routesConfig)
  return element
}

export const AppRouter = () => {
  return <AppRoutes />
}
