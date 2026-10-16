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

  test('should call onClose only after animation delay', () => {
    const { result, onClose } = renderModal(true)

    act(() => {
      result.current.close()
    })
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY - 1)
    })
    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should mark closing while animation runs', () => {
    const { result } = renderModal(true)

    act(() => {
      result.current.close()
    })
    expect(result.current.isClosing).toBe(true)

    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })
    expect(result.current.isClosing).toBe(false)
  })

  test('should call onClose once when close is called twice', () => {
    const { result, onClose } = renderModal(true)

    act(() => {
      result.current.close()
    })
    act(() => {
      jest.advanceTimersByTime(100)
      result.current.close()
    })
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should close on Escape when open', () => {
    const { onClose } = renderModal(true)

    fireEvent.keyDown(window, { key: 'Escape' })
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should ignore Escape when closed', () => {
    const { onClose } = renderModal(false)

    fireEvent.keyDown(window, { key: 'Escape' })
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })

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

  test('should finish closing when onClose changes during animation', () => {
    const { result, rerender, onClose } = renderModal(true)

    act(() => {
      result.current.close()
    })
    rerender({ isOpen: true, onClose: jest.fn() })
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('should not call onClose after unmount', () => {
    const { result, unmount, onClose } = renderModal(true)

    act(() => {
      result.current.close()
    })
    unmount()
    act(() => {
      jest.advanceTimersByTime(ANIMATION_DELAY)
    })

    expect(onClose).not.toHaveBeenCalled()
  })
})
