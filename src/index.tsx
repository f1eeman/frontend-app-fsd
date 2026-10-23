import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './app/App'
import ErrorBoundary from './app/errorBoundary/ErrorBoundary'
import { AppLoader } from './widgets/appLoader'
import { StoreProvider } from '@/app/store'
import { ThemeProvider } from '@/shared/lib/theme'

const container = document.getElementById('root')

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<AppLoader />}>
          <BrowserRouter>
            <StoreProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </StoreProvider>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </React.StrictMode>,
  )
} else {
  console.error('Root container with id:"root" not found')
}
