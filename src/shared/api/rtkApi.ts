import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'

export const baseRtkApi = createApi({
  reducerPath: 'commonRtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (hs) => {
      const t = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
      if (t) {
        hs.set('Authorization', t)
      }
      return hs
    },
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
