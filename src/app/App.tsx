import { useEffect } from 'react'
import { AppRouter } from './routing/App.Router'
import { useAppDispatch, useAppSelector } from './store'
import './styles/index.scss'
import './i18n'
import { getUserInited, userActions } from '@/entities/user'

export const App = () => {
  const dispatch = useAppDispatch()
  const userInited = useAppSelector(getUserInited)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return userInited ? <AppRouter /> : null
}
