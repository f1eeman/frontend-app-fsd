import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router'
import i18nForTests from '../i18n.tests'
import { ThemeProvider } from '@/app/theme'
import { Theme } from '@/app/theme/context'

export interface ComponentRenderOptions {
  route?: string
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {},
): ReturnType<typeof render> {
  const { route = '/' } = options
  return render(
    <MemoryRouter initialEntries={[route]}>
      <I18nextProvider i18n={i18nForTests}>
        <ThemeProvider initialTheme={Theme.LIGHT}>{component}</ThemeProvider>
      </I18nextProvider>
    </MemoryRouter>,
  )
}
