export enum AppRoutes {
  ROOT = 'root',
  ABOUT = 'about',
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
}
