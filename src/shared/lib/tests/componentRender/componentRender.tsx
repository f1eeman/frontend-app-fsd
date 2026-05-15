import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router'
import i18nForTests from '../i18n.tests'
import { StoreProvider } from '@/app/store'
import { ThemeProvider } from '@/app/theme'
import { Theme } from '@/app/theme/context'
import type { RootState } from '@/app/store'
import type { DeepPartial } from '@/shared/types'

export interface ComponentRenderOptions {
  route?: string
  initialState?: DeepPartial<RootState>
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {},
): ReturnType<typeof render> {
  const { route = '/', initialState } = options
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={Theme.LIGHT}>{component}</ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  )
}
