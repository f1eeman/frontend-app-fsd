import { useEffect, useMemo, type ReactNode } from 'react'
import type { Decorator } from '@storybook/react'

export interface MockFetchRoute {
  body?: unknown
  status?: number
  delayMs?: number
}

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
  const restore = useMemo(() => installMockFetch(routes), [routes])

  useEffect(() => restore, [restore])

  return <>{children}</>
}

type MockFetchDecoratorType = (routes: MockFetchRoutes) => Decorator

export const MockFetchDecorator: MockFetchDecoratorType = (routes) => {
  const Decorator = (story: () => React.ReactElement) => (
    <MockFetch routes={routes}>{story()}</MockFetch>
  )
  Decorator.displayName = 'MockFetchDecorator'
  return Decorator
}
