import { useEffect } from 'react'
import { AppRouter } from './routing/App.Router'
import { useAppDispatch } from './store'
import './styles/index.scss'
import './i18n'
import { userActions } from '@/entities/user'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return <AppRouter />
}
