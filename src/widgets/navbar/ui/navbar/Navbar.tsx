import { type FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cls from './Navbar.module.scss'
import { useAppSelector } from '@/app/store'
import { getUserAuthData } from '@/entities/user'
import { LoginModal } from '@/features/authByUsername'
import { AvatarDropdown } from '@/features/avatarDropDown'
import { NotificationButton } from '@/features/notificationButton'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from '@/shared/ui'
import { Button } from '@/shared/ui/button/Button'
import { HStack } from '@/shared/ui/stack'
import { TextTheme } from '@/shared/ui/text/consts'
import { Text } from '@/shared/ui/text/Text'

interface NavbarProps {
  className?: string
}

export const Navbar: FC = ({ className = '' }: NavbarProps) => {
  const { t } = useTranslation()
  const authData = useAppSelector(getUserAuthData)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false)
  const toggleAuthModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev)
  }, [])

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
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
        <HStack gap='16' className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
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
