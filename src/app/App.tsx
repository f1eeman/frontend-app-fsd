import { Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import { AppRouter } from './routing/App.Router'
import { StoreProvider } from './store'
import { ThemeProvider } from './theme/Provider'
import './styles/index.scss'
import './i18n'
import { AppLoader } from '@/widgets/AppLoader/ui/AppLoader'

export const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AppLoader />}>
        <StoreProvider>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </StoreProvider>
      </Suspense>
    </ErrorBoundary>
  )
}
