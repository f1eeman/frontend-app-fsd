import { useEffect } from 'react'
import { AppRouter } from '@/app/routing/App.Router'
import '@/app/styles/index.scss'
import '@/app/i18n'
import { getUserInited, userActions } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'

export const App = () => {
  const dispatch = useAppDispatch()
  const userInited = useAppSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return userInited ? <AppRouter /> : null
}
