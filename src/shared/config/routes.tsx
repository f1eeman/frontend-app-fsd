import { AboutPageAsync } from '@/pages/aboutPage'
import ArticleCreatePage from '@/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage'
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { MainPageAsync } from '@/pages/mainPage'
import { NotFoundPage } from '@/pages/notFoundPage'
import { ProfilePageAsync } from '@/pages/profilePage'

export const enum AppRoutes {
  ROOT = 'root',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_EDIT = 'article_edit',
  ARTICLE_CREATE = 'article_create',
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
    path: '/profile/',
    id: 'profile-page',
  },
  [AppRoutes.ARTICLES]: {
    path: '/articles',
    id: 'articles-page',
  },
  [AppRoutes.ARTICLE_CREATE]: {
    path: '/articles/create',
    id: 'article-create-page',
  },
  [AppRoutes.ARTICLE_EDIT]: {
    path: '/articles/:id/edit',
    id: 'article-edit-page',
  },
  [AppRoutes.ARTICLE_DETAILS]: {
    path: '/articles/:id/',
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
        path: routesPaths.article_details.path,
        element: <ArticleDetailsPage />,
        authOnly: true,
      },
      {
        path: `${routesPaths.article_create.path}`,
        element: <ArticleCreatePage />,
        authOnly: true,
      },
      {
        path: `${routesPaths.article_edit.path}`,
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
        path: `${routesPaths.profile.path}:id`,
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
