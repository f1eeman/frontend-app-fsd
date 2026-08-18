import { useEffect, useMemo, type ReactNode } from 'react'
import type { Decorator } from '@storybook/react'

export interface MockFetchRoute {
  /** Тело ответа, сериализуется в JSON. */
  body?: unknown
  status?: number
  /** Задержка перед ответом. Большое значение оставляет стори в состоянии загрузки. */
  delayMs?: number
}

/** Ключ — подстрока URL, например `/articles`. */
export type MockFetchRoutes = Record<string, MockFetchRoute>

const getUrl = (input: RequestInfo | URL): string => {
  if (typeof input === 'string') {
    return input
  }
  if (input instanceof URL) {
    return input.href
  }
  return input.url
}

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

/**
 * Настоящий `fetch` запоминается один раз: иначе повторная установка мока
 * поверх мока сделала бы восстановление невозможным.
 */
let pristineFetch: typeof window.fetch | null = null

const installMockFetch = (routes: MockFetchRoutes) => {
  pristineFetch ??= window.fetch
  const originalFetch = pristineFetch
  const patterns = Object.keys(routes)

  window.fetch = async (input, init) => {
    const url = getUrl(input)
    const pattern = patterns.find((candidate) => url.includes(candidate))

    if (!pattern) {
      return originalFetch(input, init)
    }

    const { body, status = 200, delayMs = 0 } = routes[pattern]

    if (delayMs > 0) {
      await wait(delayMs)
    }

    // fetchBaseQuery смотрит на content-type, без него тело не разбирается как JSON
    return new Response(JSON.stringify(body ?? null), {
      status,
      headers: { 'content-type': 'application/json' },
    })
  }

  return () => {
    window.fetch = originalFetch
  }
}

interface MockFetchProps {
  routes: MockFetchRoutes
  children: ReactNode
}

const MockFetch = ({ routes, children }: MockFetchProps) => {
  /**
   * Мок ставится в рендере, а не в эффекте: RTK Query дёргает запрос из эффекта
   * дочернего компонента, а эффекты детей выполняются раньше эффектов родителя.
   */
  const restore = useMemo(() => installMockFetch(routes), [routes])

  useEffect(() => restore, [restore])

  return <>{children}</>
}

/**
 * Подменяет `window.fetch` на время жизни стори.
 *
 * Нужен компонентам на RTK Query: в отличие от санок, у них нет гарда
 * `__PROJECT__ === 'sb'`, поэтому запрос уходит всегда, а `__API__` в Storybook пустой.
 */
type MockFetchDecoratorType = (routes: MockFetchRoutes) => Decorator

export const MockFetchDecorator: MockFetchDecoratorType = (routes) => {
  const Decorator = (story: () => React.ReactElement) => (
    <MockFetch routes={routes}>{story()}</MockFetch>
  )
  Decorator.displayName = 'MockFetchDecorator'
  return Decorator
}
