import type { RootState } from '@/app/store'

export const getUserInited = (state: RootState): boolean => state.user._inited
