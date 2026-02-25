import type { User } from '../../types/user'
import type { RootState } from '@/app/store'

export const getUserAuthData = (state: RootState): User | undefined =>
  state.user.authData
