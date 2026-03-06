export enum AppRoutes {
  ROOT = 'root',
  ABOUT = 'about',
  PROFILE = 'profile',
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
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    id: 'not-found-page',
  },
}
