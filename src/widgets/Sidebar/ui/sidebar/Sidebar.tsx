import { type FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as cls from './Sidebar.module.scss'
import MainIcon from '@/shared/assets/icons/home.svg'
import AboutIcon from '@/shared/assets/icons/list.svg'
import { routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import { AppLinkTheme } from '@/shared/ui/Link/consts'
import { AppLink } from '@/shared/ui/Link/Link'
import { LangSwitcher } from '@/widgets/LangSwticher'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'

interface SidebarProps {
  className?: string
}

export const Sidebar: FC = ({ className = '' }: SidebarProps) => {
  const { t } = useTranslation('common')
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = useCallback(() => {
    setCollapsed((collapsed) => !collapsed)
  }, [])

  return (
    <div
      data-testid='sidebar'
      className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <Button
        square
        theme={'background-inverted'}
        onClick={toggleCollapsed}
        data-testid='sidebar-toggle'
        className={cls.collapseBtn}
        size={'size-l'}
      >
        {`${collapsed ? '>' : '<'}`}
      </Button>
      <div className={cls.navLinks}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.navLink}
          to={routesPaths.root.path}
        >
          <MainIcon />
          <span className={cls.navLinkText}> {t('Главная страница')}</span>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          className={cls.navLink}
          to={routesPaths.about.path}
        >
          <AboutIcon />
          <span className={cls.navLinkText}>{t('О сайте')}</span>
        </AppLink>
      </div>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short />
      </div>
    </div>
  )
}
