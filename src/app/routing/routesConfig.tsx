import { userRole, type UserRole } from '@/entities/user'
import { AboutPageAsync } from '@/pages/aboutPage'
import { AdminPanelPage } from '@/pages/adminPanelPage'
import { ArticleCreatePage } from '@/pages/articleCreatePage'
import { ArticleDetailsPage } from '@/pages/articleDetailsPage'
import { ArticleEditPage } from '@/pages/articleEditPage'
import { ArticlesPage } from '@/pages/articlesPage'
import { ForbiddenPage } from '@/pages/forbiddenPage'
import { MainPageAsync } from '@/pages/mainPage'
import { NotFoundPage } from '@/pages/notFoundPage'
import { ProfilePageAsync } from '@/pages/profilePage'
import { routesPaths } from '@/shared/config/routes'
import type { RouteObject } from 'react-router'

export type AppRouteObject = RouteObject & {
  authOnly?: boolean
  roles?: UserRole[]
  children?: AppRouteObject[]
}

export const routesConfig: AppRouteObject[] = [
  {
    element: <MainPageAsync />,
    path: routesPaths.root.path,
    id: routesPaths.root.id,
    children: [
      {
        path: routesPaths.articles.path,
        element: <ArticlesPage />,
        authOnly: true,
      },
      {
        path: routesPaths.article_details.path,
        element: <ArticleDetailsPage />,
        authOnly: true,
      },
      {
        path: routesPaths.article_create.path,
        element: <ArticleCreatePage />,
        authOnly: true,
      },
      {
        path: routesPaths.article_edit.path,
        element: <ArticleEditPage />,
        authOnly: true,
      },
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
        authOnly: true,
        roles: [userRole.ADMIN, userRole.MANAGER],
        element: <AdminPanelPage />,
        path: routesPaths.admin_panel.path,
        id: routesPaths.admin_panel.id,
      },
      {
        element: <ForbiddenPage />,
        path: routesPaths.forbidden.path,
        id: routesPaths.forbidden.id,
      },
      {
        element: <NotFoundPage />,
        path: routesPaths.not_found.path,
        id: routesPaths.not_found.id,
      },
    ],
  },
]
