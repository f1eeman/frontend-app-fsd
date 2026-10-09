import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'
import { userRole, type UserRole } from '@/entities/user'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

const openAvatarMenu = async (role: UserRole) => {
  componentRender(<Navbar />, {
    initialState: {
      user: {
        _inited: true,
        authData: { id: '1', username: 'test', role },
      },
    },
  })

  await userEvent.click(screen.getByRole('button'))
}

describe('Navbar.test', () => {
  test('should show admin panel link for admin', async () => {
    await openAvatarMenu(userRole.ADMIN)

    expect(screen.getByText('Админка')).toBeInTheDocument()
  })

  test('should show admin panel link for manager', async () => {
    await openAvatarMenu(userRole.MANAGER)

    expect(screen.getByText('Админка')).toBeInTheDocument()
  })

  test('should hide admin panel link for user', async () => {
    await openAvatarMenu(userRole.USER)

    expect(screen.getByText('Выйти')).toBeInTheDocument()
    expect(screen.queryByText('Админка')).not.toBeInTheDocument()
  })
})
