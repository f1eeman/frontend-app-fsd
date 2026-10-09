export const enum AppRoutes {
  ROOT = 'root',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_EDIT = 'article_edit',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_DETAILS = 'article_details',
  ADMIN_PANEL = 'admin_panel',
  NOT_FOUND = 'not_found',
}

export const routesPaths: Record<AppRoutes, Record<'id' | 'path', string>> = {
  [AppRoutes.ROOT]: {
    path: '/',
    id: 'root-page',
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: '/admin-panel',
    id: 'admin-panel',
  },
  [AppRoutes.ABOUT]: {
    path: '/about',
    id: 'about-page',
  },
  [AppRoutes.PROFILE]: {
    path: '/profile/:id',
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
