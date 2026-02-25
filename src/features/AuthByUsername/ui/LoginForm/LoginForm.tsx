import { unwrapResult } from '@reduxjs/toolkit'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import {
  loginActions,
  selectIsLoading,
  selectPassword,
  selectUsername,
  selectLoginError,
} from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { TextTheme } from '@/shared/ui/Text/consts'
import { Text } from '@/shared/ui/Text/Text'

export interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

const LoginForm = memo<LoginFormProps>((props) => {
  const { className = '', onSuccess } = props
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectUsername)
  const password = useAppSelector(selectPassword)
  const isLoading = useAppSelector(selectIsLoading)
  const error = useAppSelector(selectLoginError)

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch],
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }))
    unwrapResult(result)
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess()
    }
  }, [dispatch, onSuccess, password, username])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && <Text text={t(error)} theme={TextTheme.ERROR} />}
      <Input
        autofocus
        type='text'
        className={cls.input}
        placeholder={t('Введите username')}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type={'password'}
        className={cls.input}
        placeholder={t('Введите пароль')}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        theme={'clear'}
        className={cls.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Войти')}
      </Button>
    </div>
  )
})

export default LoginForm
LoginForm.displayName = 'LoginForm'
