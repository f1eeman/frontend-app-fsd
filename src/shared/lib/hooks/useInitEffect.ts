import { useEffect } from 'react'

export function useInitialEffect(callback: () => void | (() => void)) {
  useEffect(() => {
    if (__PROJECT__ !== 'sb') {
      return callback()
    }
  }, [])
}
