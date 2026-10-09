import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router'
import { RequireAuth } from '@/app/routing/RequireAuth'
import { userRole, type UserRole } from '@/entities/user'
import { routesPaths } from '@/shared/config/routes'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

const renderAdminRoute = (role?: UserRole) =>
  componentRender(
    <Routes>
      <Route path={routesPaths.root.path} element={<div>main</div>} />
      <Route path={routesPaths.about.path} element={<div>about</div>} />
      <Route path={routesPaths.forbidden.path} element={<div>forbidden</div>} />
      <Route
        path={routesPaths.admin_panel.path}
        element={
          <RequireAuth roles={[userRole.ADMIN, userRole.MANAGER]}>
            <div>admin</div>
          </RequireAuth>
        }
      />
    </Routes>,
    {
      route: routesPaths.admin_panel.path,
      initialState: {
        user: {
          _inited: true,
          authData: role ? { id: '1', username: 'test', role } : undefined,
        },
      },
    },
  )

describe('RequireAuth.test', () => {
  test('should render page for allowed role', () => {
    renderAdminRoute(userRole.MANAGER)

    expect(screen.getByText('admin')).toBeInTheDocument()
  })

  test('should redirect to forbidden page for wrong role', () => {
    renderAdminRoute(userRole.USER)

    expect(screen.getByText('forbidden')).toBeInTheDocument()
  })

  test('should redirect to about page when user is not logged in', () => {
    renderAdminRoute()

    expect(screen.getByText('about')).toBeInTheDocument()
  })
})
