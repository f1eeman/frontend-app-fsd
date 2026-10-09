import { screen } from '@testing-library/react'
import ForbiddenPage from './ForbiddenPage'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

describe('ForbiddenPage.test', () => {
  test('should show access denied message', () => {
    componentRender(<ForbiddenPage />)

    expect(
      screen.getByText('У вас нет доступа к этой странице'),
    ).toBeInTheDocument()
  })
})
