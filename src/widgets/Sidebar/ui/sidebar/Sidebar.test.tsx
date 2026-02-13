import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

describe('Sidebar', () => {
  test('with only first param', () => {
    componentRender(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
  test('test toggle', () => {
    componentRender(<Sidebar />)
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toBeInTheDocument()
    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(toggleBtn).toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(sidebar).toHaveClass('collapsed')
  })
})
