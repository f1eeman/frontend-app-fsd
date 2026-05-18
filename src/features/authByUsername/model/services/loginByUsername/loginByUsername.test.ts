import { loginByUsername } from './loginByUsername'
import { type User, userActions } from '@/entities/user'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'

jest.mock('@/entities/user', () => ({
  userActions: {
    setAuthData: jest.fn((payload: unknown) => ({
      type: 'user/setAuthData',
      payload,
    })),
  },
  User: {},
}))

jest.mock('@/shared/consts/localstorage', () => ({
  USER_LOCALSTORAGE_KEY: 'test-user-key',
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('loginByUsername', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
  })

  test('should successfully login and return user data', async () => {
    const mockUserData: User = { id: '1', username: 'testuser' }
    const mockPayload = { username: 'testuser', password: 'password123' }

    const testThunk = new TestAsyncThunk(loginByUsername)
    testThunk.api.post.mockResolvedValue({
      data: mockUserData,
    })
    const result = await testThunk.callThunk(mockPayload)

    expect(testThunk.api.post).toHaveBeenCalledWith(
      'http://localhost:8000/login',
      mockPayload,
    )
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-user-key',
      JSON.stringify(mockUserData),
    )
    expect(userActions.setAuthData).toHaveBeenCalledWith(mockUserData)
    expect(testThunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(mockUserData),
    )
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.type).toBe('login/loginByUsername/fulfilled')
    expect(result.payload).toEqual(mockUserData)
  })

  test('should reject with error when response data is missing', async () => {
    const mockPayload = { username: 'testuser', password: 'wrongpassword' }

    const testThunk = new TestAsyncThunk(loginByUsername)
    testThunk.api.post.mockResolvedValue({
      data: null,
    })
    const result = await testThunk.callThunk(mockPayload)

    expect(testThunk.api.post).toHaveBeenCalledWith(
      'http://localhost:8000/login',
      mockPayload,
    )
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(userActions.setAuthData).not.toHaveBeenCalled()
    expect(testThunk.dispatch).toHaveBeenCalledTimes(2)
    expect(testThunk.dispatch).not.toHaveBeenCalledWith(
      userActions.setAuthData(expect.anything()),
    )
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.type).toBe('login/loginByUsername/rejected')
    expect(result.payload).toBe('Вы ввели неверный логин или пароль')
  })

  test('should reject with error when axios request fails', async () => {
    const mockPayload = { username: 'testuser', password: 'wrongpassword' }

    const testThunk = new TestAsyncThunk(loginByUsername)
    testThunk.api.post.mockRejectedValue(new Error('Network error'))
    const result = await testThunk.callThunk(mockPayload)

    expect(testThunk.api.post).toHaveBeenCalledWith(
      'http://localhost:8000/login',
      mockPayload,
    )
    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(userActions.setAuthData).not.toHaveBeenCalled()
    expect(testThunk.dispatch).toHaveBeenCalledTimes(2)
    expect(testThunk.dispatch).not.toHaveBeenCalledWith(
      userActions.setAuthData(expect.anything()),
    )
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.type).toBe('login/loginByUsername/rejected')
    expect(result.payload).toBe('Вы ввели неверный логин или пароль')
  })

  test('should call dispatch with correct user actions on success', async () => {
    const mockUserData: User = { id: '1', username: 'testuser' }
    const mockPayload = { username: 'testuser', password: 'password123' }

    const testThunk = new TestAsyncThunk(loginByUsername)
    testThunk.api.post.mockResolvedValue({
      data: mockUserData,
    })

    await testThunk.callThunk(mockPayload)

    expect(testThunk.dispatch).toHaveBeenCalledWith(
      userActions.setAuthData(mockUserData),
    )
  })

  test('should not call dispatch when request fails', async () => {
    const mockPayload = { username: 'testuser', password: 'wrongpassword' }

    const testThunk = new TestAsyncThunk(loginByUsername)
    testThunk.api.post.mockRejectedValue(new Error('Network error'))

    await testThunk.callThunk(mockPayload)

    expect(testThunk.dispatch).not.toHaveBeenCalledWith(
      userActions.setAuthData(expect.anything()),
    )
  })
})
