import { lazy } from 'react'
import type { FC } from 'react'
import type { AdminPanelPageProps } from './AdminPanelPage'

export const AdminPanelPageAsync = lazy<FC<AdminPanelPageProps>>(
  async () =>
    import(/* webpackChunkName: "AdminPanelPage" */ './AdminPanelPage'),
)
