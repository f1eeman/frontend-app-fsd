import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router'
import { Navbar } from '@/widgets/navbar'
import { PageLoader } from '@/widgets/pageLoader'
import { Sidebar } from '@/widgets/sidebar'

const MainPage = () => {
  const { t } = useTranslation('main')
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <div className={'page-wrapper'}>
          <div>{t('Главная')}</div>
          <Suspense key={location.pathname} fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default MainPage
