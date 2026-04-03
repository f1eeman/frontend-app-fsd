import { AboutPageAsync } from '@/pages/aboutPage'
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { MainPageAsync } from '@/pages/mainPage'
import { NotFoundPage } from '@/pages/notFoundPage'
import { ProfilePageAsync } from '@/pages/profilePage'

export const enum AppRoutes {
  ROOT = 'root',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  NOT_FOUND = 'not_found',
}

export const routesPaths: Record<AppRoutes, Record<'id' | 'path', string>> = {
  [AppRoutes.ROOT]: {
    path: '/',
    id: 'root-page',
  },
  [AppRoutes.ABOUT]: {
    path: '/about',
    id: 'about-page',
  },
  [AppRoutes.PROFILE]: {
    path: '/profile',
    id: 'profile-page',
  },
  [AppRoutes.ARTICLES]: {
    path: '/articles',
    id: 'articles-page',
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: '/articles/',
    id: 'article-details-page',
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    id: 'not-found-page',
  },
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
        path: `${routesPaths.article_details.path}:id`,
        element: <ArticleDetailsPage />,
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
        element: <NotFoundPage />,
        path: routesPaths.not_found.path,
        id: routesPaths.not_found.id,
      },
    ],
  },
]
