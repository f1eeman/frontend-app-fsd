import { type FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Navbar.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getUserAuthData, userActions } from '@/entities/user'
import { LoginModal } from '@/features/authByUsername'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui'
import { Button } from '@/shared/ui/button/Button'
import { TextTheme } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'

interface NavbarProps {
  className?: string
}

export const Navbar: FC = ({ className = '' }: NavbarProps) => {
  const { t } = useTranslation()
  const authData = useAppSelector(getUserAuthData)
  const dispatch = useAppDispatch()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev)
  }, [])

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (authData) {
    return (
      <div className={classNames(cls.navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t('MY APP')}
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={routesPaths.article_create.path}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t('Создать статью')}
        </AppLink>
        <Button
          theme={'clear-inverted'}
          className={cls.links}
          onClick={onLogout}
        >
          {t('Выйти')}
        </Button>
      </div>
    )
  }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <Button theme={'clear-inverted'} onClick={toggleAuthModal}>
          {t('Войти')}
        </Button>
      </div>
      <LoginModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} />
    </div>
  )
}
