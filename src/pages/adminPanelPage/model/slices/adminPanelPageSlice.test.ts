import {
  adminPanelPageActions,
  adminPanelPageReducer,
} from './adminPanelPageSlice'
import type { AdminPanelPageSchema } from '../types/adminPanelPageSchema'
import type { DeepPartial } from '@/shared/types'

describe('adminPanelPageSlice.test', () => {
  test('setIsLoading updates isLoading', () => {
    const state: DeepPartial<AdminPanelPageSchema> = { isLoading: false }

    expect(
      adminPanelPageReducer(
        state as AdminPanelPageSchema,
        adminPanelPageActions.setIsLoading(true),
      ),
    ).toEqual({ isLoading: true })
  })
})
