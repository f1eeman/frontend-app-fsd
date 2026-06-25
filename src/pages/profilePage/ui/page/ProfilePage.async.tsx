import { lazy } from 'react'
import type { FC } from 'react'

export const ProfilePageAsync = lazy<FC>(
  () => import(/* webpackChunkName: "ProfilePage" */ './ProfilePage'),
)
