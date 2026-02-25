import { type LoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: Partial<LoginSchema> = { username: '123' }
    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('123123')),
    ).toEqual({ username: '123123' })
  })

  test('test set password', () => {
    const state: Partial<LoginSchema> = { password: '123' }
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('123123')),
    ).toEqual({ password: '123123' })
  })
})
