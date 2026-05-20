import { getSidebarItems } from './getSidebarItems'
import type { RootState } from '@/app/store'

describe('getSidebarItems.test', () => {
  test('returns 2 items when not authenticated', () => {
    const state = {
      user: { authData: undefined, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items).toHaveLength(2)
    expect(items[0].text).toBe('Главная')
    expect(items[1].text).toBe('О сайте')
  })

  test('returns 4 items when authenticated', () => {
    const state = {
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items).toHaveLength(4)
    expect(items[2].text).toBe('Профиль')
    expect(items[2].authOnly).toBe(true)
    expect(items[3].text).toBe('Статьи')
    expect(items[3].authOnly).toBe(true)
  })

  test('profile path includes the authenticated user id', () => {
    const state = {
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items[2].path).toContain('42')
  })
})
