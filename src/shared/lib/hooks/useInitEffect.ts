import { useEffect } from 'react'

export const useInitialEffect = (callback: () => void | (() => void)) => {
  useEffect(() => {
    if (__PROJECT__ === 'sb') {
      return
    }
    return callback()
  }, [callback])
}
