import { Theme, useTheme } from '@/app/theme'
import ThemeDarkIcon from '@/shared/assets/icons/theme-dark.svg'
import ThemeLightIcon from '@/shared/assets/icons/theme-light.svg'
import { Button } from '@/shared/ui/button/Button'
import type { FC } from 'react'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { toggleTheme, theme } = useTheme()

  return (
    <Button theme={'clear'} onClick={toggleTheme} className={className}>
      {theme === Theme.DARK && <ThemeDarkIcon />}
      {theme === Theme.LIGHT && <ThemeLightIcon />}
    </Button>
  )
}
