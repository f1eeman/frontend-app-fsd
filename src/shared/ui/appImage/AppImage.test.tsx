import { act, render, screen } from '@testing-library/react'
import { AppImage } from './AppImage'
import {
  FakeImage,
  mockImage,
  restoreImage,
} from '@/shared/lib/tests/fakeImage'

const fallback = <div>loading</div>
const errorFallback = <div>error</div>

describe('AppImage', () => {
  beforeEach(mockImage)

  afterEach(restoreImage)

  test('shows fallback while loading and image after load', () => {
    render(
      <AppImage
        src='/a.png'
        alt='a'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )
    expect(screen.getByText('loading')).toBeInTheDocument()
    expect(FakeImage.last().src).toBe('/a.png')

    act(() => FakeImage.last().onload?.())

    expect(screen.getByRole('img')).toHaveAttribute('src', '/a.png')
  })

  test('shows error fallback when image fails', () => {
    render(
      <AppImage
        src='/a.png'
        alt='a'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )

    act(() => FakeImage.last().onerror?.())

    expect(screen.getByText('error')).toBeInTheDocument()
  })

  test('renders image right away without fallback', () => {
    render(<AppImage src='/a.png' alt='a' />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/a.png')
  })

  test('shows error fallback for empty src', () => {
    render(<AppImage alt='a' errorFallback={errorFallback} />)
    expect(screen.getByText('error')).toBeInTheDocument()
  })

  test('resets state when src changes', () => {
    const { rerender } = render(
      <AppImage
        src='/a.png'
        alt='a'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )
    act(() => FakeImage.last().onerror?.())
    expect(screen.getByText('error')).toBeInTheDocument()

    rerender(
      <AppImage
        src='/b.png'
        alt='b'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )
    expect(screen.getByText('loading')).toBeInTheDocument()

    act(() => FakeImage.last().onload?.())
    expect(screen.getByRole('img')).toHaveAttribute('src', '/b.png')
  })

  test('ignores late result of previous src', () => {
    const { rerender } = render(
      <AppImage
        src='/a.png'
        alt='a'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )
    const first = FakeImage.last()

    rerender(
      <AppImage
        src='/b.png'
        alt='b'
        fallback={fallback}
        errorFallback={errorFallback}
      />,
    )
    act(() => first.onerror?.())

    expect(screen.getByText('loading')).toBeInTheDocument()
  })
})
