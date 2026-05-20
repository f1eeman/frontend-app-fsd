import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Navbar } from '@/widgets/navbar'
import { PageLoader } from '@/widgets/pageLoader'
import { Sidebar } from '@/widgets/sidebar'

const MainPage = () => {
  const location = useLocation()
  return (
    <div>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <Suspense key={location.pathname} fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default MainPage
