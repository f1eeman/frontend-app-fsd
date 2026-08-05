import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ValidateProfileError, type ProfileSchema } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'
import { Country } from '@/entities/country'
import { Currency } from '@/entities/currency'
import type { DeepPartial } from '@/shared/types'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Ukraine,
  lastname: 'admin',
  first: 'asd',
  city: 'asf',
  currency: Currency.USD,
}

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true)),
    ).toEqual({ readonly: true })
  })

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({
      readonly: true,
      validateErrors: [],
      data,
      form: data,
    })
  })

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: '123456',
        }),
      ),
    ).toEqual({
      form: { username: '123456' },
    })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    }

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending('')),
    ).toEqual({
      isLoading: true,
      validateErrors: [],
      error: null,
    })
  })

  test('test update profile service fullfiled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    }

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      isLoading: false,
      validateErrors: [],
      readonly: true,
      form: data,
      data,
    })
  })
})
