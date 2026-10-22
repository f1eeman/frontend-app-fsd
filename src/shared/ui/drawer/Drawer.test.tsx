import { Globals } from '@react-spring/web'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Drawer } from './Drawer'

const renderOpenDrawer = async () => {
  const onClose = jest.fn()
  render(
    <Drawer isOpen onClose={onClose}>
      content
    </Drawer>,
  )
  await screen.findByText('content')

  return onClose
}

describe('Drawer.test', () => {
  beforeAll(() => {
    Globals.assign({ skipAnimation: true })
  })

  afterAll(() => {
    Globals.assign({ skipAnimation: false })
  })

  test('should show content when open', async () => {
    await renderOpenDrawer()

    expect(screen.getByText('content')).toBeInTheDocument()
  })

  test('should call onClose on Escape', async () => {
    const onClose = await renderOpenDrawer()

    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  test('should hide content after isOpen becomes false', async () => {
    const { rerender } = render(<Drawer isOpen>content</Drawer>)
    await screen.findByText('content')

    rerender(<Drawer isOpen={false}>content</Drawer>)

    await waitFor(() => {
      expect(screen.queryByText('content')).not.toBeInTheDocument()
    })
  })

  test('should not call onClose on Escape when closed', async () => {
    const onClose = jest.fn()
    render(
      <Drawer isOpen={false} onClose={onClose}>
        content
      </Drawer>,
    )

    fireEvent.keyDown(window, { key: 'Escape' })

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  test('should call onClose on overlay click', async () => {
    const onClose = await renderOpenDrawer()
    const overlay = document.querySelector('.Overlay')

    expect(overlay).not.toBeNull()
    fireEvent.click(overlay as Element)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
