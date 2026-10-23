import { setupListeners } from '@reduxjs/toolkit/query'
import { useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from './store'
import type { FC, ReactNode } from 'react'
import type { RootState } from '@/shared/lib/store'
import type { DeepPartial } from '@/shared/types'

interface StoreProviderProps {
  children: ReactNode
  initialState?: DeepPartial<RootState>
}

export const StoreProvider: FC<StoreProviderProps> = ({
  children,
  initialState,
}) => {
  const store = useMemo(() => setupStore(initialState), [initialState])

  useEffect(() => setupListeners(store.dispatch), [store])

  return <Provider store={store}>{children}</Provider>
}
