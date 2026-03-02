import { type LoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer, withLoginSlice } from './loginSlice'

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

  describe('selectors', () => {
    const mockState = withLoginSlice.selectors

    test('selectUsername should return username', () => {
      const state = {
        login: {
          username: 'testuser',
          password: '',
          isLoading: false,
          error: undefined,
        },
      }
      expect(mockState.selectUsername(state)).toBe('testuser')
    })

    test('selectPassword should return password', () => {
      const state = {
        login: {
          username: '',
          password: 'testpass',
          isLoading: false,
          error: undefined,
        },
      }
      expect(mockState.selectPassword(state)).toBe('testpass')
    })

    test('selectIsLoading should return loading state', () => {
      const state = {
        login: {
          username: '',
          password: '',
          isLoading: true,
          error: undefined,
        },
      }
      expect(mockState.selectIsLoading(state)).toBe(true)
    })

    test('selectLoginError should return error', () => {
      const state = {
        login: {
          username: '',
          password: '',
          isLoading: false,
          error: 'Invalid credentials',
        },
      }
      expect(mockState.selectLoginError(state)).toBe('Invalid credentials')
    })

    test('selectors should work with initial state', () => {
      const state = {
        login: {
          username: '',
          password: '',
          isLoading: false,
          error: undefined,
        },
      }
      expect(mockState.selectUsername(state)).toBe('')
      expect(mockState.selectPassword(state)).toBe('')
      expect(mockState.selectIsLoading(state)).toBe(false)
      expect(mockState.selectLoginError(state)).toBe(undefined)
    })
  })
})
