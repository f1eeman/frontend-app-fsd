import { Suspense } from 'react'
import { AppRouter } from './routing/App.Router'
import { ThemeProvider } from './theme/Provider'
import './styles/index.scss'
import './i18n'
import { GridLoader } from '@/shared/ui/Loaders/Grid/GridLoader'

export const App = () => {
  return (
    <Suspense fallback={<GridLoader />}>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </Suspense>
  )
}
