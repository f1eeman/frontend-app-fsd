import { fireEvent, renderHook } from '@testing-library/react'
import { useEscapeKey } from './useEscapeKey'

describe('useEscapeKey.test', () => {
  test('should call handler on Escape when active', () => {
    const onEscape = jest.fn()
    renderHook(() => useEscapeKey(true, onEscape))

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  test('should ignore Escape when inactive', () => {
    const onEscape = jest.fn()
    renderHook(() => useEscapeKey(false, onEscape))

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onEscape).not.toHaveBeenCalled()
  })

  test('should ignore other keys', () => {
    const onEscape = jest.fn()
    renderHook(() => useEscapeKey(true, onEscape))

    fireEvent.keyDown(window, { key: 'Enter' })

    expect(onEscape).not.toHaveBeenCalled()
  })

  test('should stop listening after unmount', () => {
    const onEscape = jest.fn()
    const { unmount } = renderHook(() => useEscapeKey(true, onEscape))

    unmount()
    fireEvent.keyDown(window, { key: 'Escape' })

    expect(onEscape).not.toHaveBeenCalled()
  })
})
