import { getUIScrollByPath } from './UISlice'
import type { RootState } from '@/app/store'

describe('getUIScrollByPath.test', () => {
  test('should return saved scroll position for path', () => {
    const state = {
      ui: { scroll: { '/articles': 300 } },
    } as unknown as RootState

    expect(getUIScrollByPath(state, '/articles')).toBe(300)
  })

  test('should return 0 when path has no saved position', () => {
    const state = {
      ui: { scroll: {} },
    } as unknown as RootState

    expect(getUIScrollByPath(state, '/articles')).toBe(0)
  })
})
