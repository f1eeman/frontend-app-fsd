import { BrowserRouter, useRoutes } from 'react-router'
import { AboutPageAsync } from '@/pages/AboutPage/AboutPage.async'
import { MainPageAsync } from '@/pages/MainPage/MainPage.async'
import { NotFoundPage } from '@/pages/NotFoundPage'
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
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
