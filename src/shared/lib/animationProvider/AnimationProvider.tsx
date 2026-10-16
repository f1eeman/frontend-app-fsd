import { createContext, useContext, useEffect, useState } from 'react'
import type * as SpringLib from '@react-spring/web'
import type * as GestureLib from '@use-gesture/react'
import type { ReactNode } from 'react'

type AnimationLibs =
  | { isLoaded: false }
  | {
      isLoaded: true
      Spring: typeof SpringLib
      Gesture: typeof GestureLib
    }

const AnimationContext = createContext<AnimationLibs>({ isLoaded: false })

const loadAnimationLibs = () =>
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')])

export const useAnimationLibs = () => useContext(AnimationContext)

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [libs, setLibs] = useState<AnimationLibs>({ isLoaded: false })

  useEffect(() => {
    loadAnimationLibs()
      .then(([Spring, Gesture]) => {
        setLibs({ isLoaded: true, Spring, Gesture })
      })
      .catch((error: unknown) => {
        console.error(error)
      })
  }, [])

  return (
    <AnimationContext.Provider value={libs}>
      {children}
    </AnimationContext.Provider>
  )
}
