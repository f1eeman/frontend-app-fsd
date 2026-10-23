import { act, render, screen } from '@testing-library/react'
import { Avatar } from './Avatar'
import {
  FakeImage,
  mockImage,
  restoreImage,
} from '@/shared/lib/tests/fakeImage'
import type { SVGProps } from 'react'

jest.mock(
  '@/shared/assets/icons/user-filled.svg',
  () =>
    function UserIconMock(props: SVGProps<SVGSVGElement>) {
      return <svg data-testid='user-icon' {...props} />
    },
)

describe('Avatar', () => {
  beforeEach(mockImage)

  afterEach(restoreImage)

  test('shows round skeleton with className while loading', () => {
    const { container } = render(
      <Avatar src='/a.png' size={30} className='outer' />,
    )
    const skeleton = container.firstElementChild as HTMLElement

    expect(skeleton).toHaveClass('Skeleton', 'outer')
    expect(skeleton).toHaveStyle({ width: '30px', borderRadius: '50%' })
  })

  test('shows image with className after load', () => {
    render(<Avatar src='/a.png' alt='user' className='outer' />)

    act(() => FakeImage.last().onload?.())

    expect(screen.getByRole('img')).toHaveAttribute('src', '/a.png')
    expect(screen.getByRole('img')).toHaveClass('Avatar', 'outer')
  })

  test('shows user icon with className on error', () => {
    render(<Avatar src='/a.png' className='outer' />)

    act(() => FakeImage.last().onerror?.())

    expect(screen.getByTestId('user-icon')).toHaveClass('Icon', 'outer')
  })

  test('shows inverted user icon without src', () => {
    render(<Avatar fallbackInverted />)

    expect(screen.getByTestId('user-icon')).toHaveClass('inverted')
  })
})
