import { useEffect } from 'react'
import { AppRouter } from '@/app/routing/App.Router'
import { getUserInited, userActions } from '@/entities/user'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import '@/app/i18n'
import '@/app/styles/index.scss'

export const App = () => {
  const dispatch = useAppDispatch()
  const userInited = useAppSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return userInited ? <AppRouter /> : null
}
