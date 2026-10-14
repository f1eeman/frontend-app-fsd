import { screen } from '@testing-library/react'
import { Navbar } from './Navbar'
import { userRole } from '@/entities/user'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

describe('Navbar.test', () => {
  test('should show login button for guest', () => {
    componentRender(<Navbar />)

    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
    expect(screen.queryByText('Создать статью')).not.toBeInTheDocument()
  })

  test('should show user actions for authorized user', () => {
    componentRender(<Navbar />, {
      initialState: {
        user: {
          _inited: true,
          authData: { id: '1', username: 'test', role: userRole.USER },
        },
      },
    })

    expect(screen.getByText('Создать статью')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(
      screen.queryByRole('button', { name: 'Войти' }),
    ).not.toBeInTheDocument()
  })
})
