import { act, fireEvent, renderHook } from '@testing-library/react'
import { useModal } from './useModal'

const ANIMATION_DELAY = 300

interface HookProps {
  isOpen: boolean
  onClose: () => void
}

const renderModal = (isOpen: boolean) => {
  const onClose = jest.fn()
  const hook = renderHook(
    (props: HookProps) =>
      useModal({ ...props, animationDelay: ANIMATION_DELAY }),
    { initialProps: { isOpen, onClose } },
  )

  return { ...hook, onClose }
}

describe('useModal.test', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should call onClose immediately on close', () => {
    const { result, onClose } = renderModal(true)

    act(() => {
      result.current.close()
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should ignore close when already closed', () => {
    const { result, onClose } = renderModal(false)

    act(() => {
      result.current.close()
    })

    expect(onClose).not.toHaveBeenCalled()
  })

  test('should mark closing for animation delay after isOpen becomes false', () => {
    const { result, rerender, onClose } = renderModal(true)

    rerender({ isOpen: false, onClose })
    expect(result.current.isClosing).toBe(true)

    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY - 1)
    })
    expect(result.current.isClosing).toBe(true)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current.isClosing).toBe(false)
  })

  test('should stop closing when reopened during animation', () => {
    const { result, rerender, onClose } = renderModal(true)

    rerender({ isOpen: false, onClose })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    rerender({ isOpen: true, onClose })
    expect(result.current.isClosing).toBe(false)

    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })
    expect(result.current.isClosing).toBe(false)
  })

  test('should not mark closing when initially closed', () => {
    const { result } = renderModal(false)

    expect(result.current.isClosing).toBe(false)
  })

  test('should call onClose on Escape when open', () => {
    const { onClose } = renderModal(true)

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should ignore Escape when closed', () => {
    const { onClose } = renderModal(false)

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onClose).not.toHaveBeenCalled()
  })

  test('should stay mounted after first open', () => {
    const { result, rerender, onClose } = renderModal(false)
    expect(result.current.isMounted).toBe(false)

    rerender({ isOpen: true, onClose })
    expect(result.current.isMounted).toBe(true)

    rerender({ isOpen: false, onClose })
    expect(result.current.isMounted).toBe(true)
  })
})
