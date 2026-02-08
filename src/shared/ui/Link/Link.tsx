import { Link, type LinkProps } from 'react-router'
import { AppLinkTheme } from './consts'
import * as cls from './Link.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { FC } from 'react'

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const {
    to,
    className = '',
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props

  return (
    <Link
      to={to}
      className={classNames(cls.appLink, { [cls[theme]]: true }, [className])}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
