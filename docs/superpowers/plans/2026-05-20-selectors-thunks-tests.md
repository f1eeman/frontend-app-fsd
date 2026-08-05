# Selectors & Thunks Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit tests for all selectors and async thunks that currently lack coverage.

**Architecture:** Each test file lives next to the source file it tests, following the existing convention (`loginSlice.test.ts`, `articleDetails.test.ts`). Slice selectors are tested via `slice.selectors` (RTK wraps them to accept `{ [sliceName]: ... }`). Standalone selectors are called directly with a partial `RootState`. Thunks use the project's `TestAsyncThunk` utility.

**Tech Stack:** Jest, `@reduxjs/toolkit`, `TestAsyncThunk` (`@/shared/lib/tests/async.thunk.tests`)

---

## Files to create

| Test file                                                                            | Source file            |
| ------------------------------------------------------------------------------------ | ---------------------- |
| `src/entities/user/model/selectors/getUserAuthData/getUserAuthData.test.ts`          | `getUserAuthData.ts`   |
| `src/entities/user/model/selectors/getUserInited/getUserInited.test.ts`              | `getUserInited.ts`     |
| `src/widgets/sidebar/model/selectors/getSidebarItems.test.ts`                        | `getSidebarItems.ts`   |
| `src/pages/ArticlesPage/model/slices/articlesPageSlice.test.ts`                      | `articlesPageSlice.ts` |
| `src/features/authByUsername/model/services/loginByUsername/loginByUsername.test.ts` | `loginByUsername.ts`   |
| `src/entities/article/model/services/fetchArticleById/fetchArticleById.test.ts`      | `fetchArticleById.ts`  |
| `src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts`  | `fetchArticlesList.ts` |

---

### Task 1: getUserAuthData selector tests

**Files:**

- Create: `src/entities/user/model/selectors/getUserAuthData/getUserAuthData.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { getUserAuthData } from './getUserAuthData'
import type { RootState } from '@/app/store'

describe('getUserAuthData.test', () => {
  test('should return authData when user is logged in', () => {
    const state = {
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    } as unknown as RootState

    expect(getUserAuthData(state)).toEqual({ id: '1', username: 'admin' })
  })

  test('should return undefined when user is not logged in', () => {
    const state = {
      user: { authData: undefined, _inited: true },
    } as unknown as RootState

    expect(getUserAuthData(state)).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=getUserAuthData.test
```

Expected: PASS (2 tests)

- [ ] **Step 3: Commit**

```bash
git add src/entities/user/model/selectors/getUserAuthData/getUserAuthData.test.ts
git commit -m "test: add getUserAuthData selector tests"
```

---

### Task 2: getUserInited selector tests

**Files:**

- Create: `src/entities/user/model/selectors/getUserInited/getUserInited.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { getUserInited } from './getUserInited'
import type { RootState } from '@/app/store'

describe('getUserInited.test', () => {
  test('should return true when app is inited', () => {
    const state = {
      user: { _inited: true },
    } as unknown as RootState

    expect(getUserInited(state)).toBe(true)
  })

  test('should return false when app is not inited', () => {
    const state = {
      user: { _inited: false },
    } as unknown as RootState

    expect(getUserInited(state)).toBe(false)
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=getUserInited.test
```

Expected: PASS (2 tests)

- [ ] **Step 3: Commit**

```bash
git add src/entities/user/model/selectors/getUserInited/getUserInited.test.ts
git commit -m "test: add getUserInited selector tests"
```

---

### Task 3: getSidebarItems selector tests

`getSidebarItems` is a memoized `createSelector` that depends on `getUserAuthData`.
It returns 2 items when logged out, 4 items when logged in (adds "Профиль" and "Статьи").

**Files:**

- Create: `src/widgets/sidebar/model/selectors/getSidebarItems.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { getSidebarItems } from './getSidebarItems'
import type { RootState } from '@/app/store'

describe('getSidebarItems.test', () => {
  test('returns 2 items when not authenticated', () => {
    const state = {
      user: { authData: undefined, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items).toHaveLength(2)
    expect(items[0].text).toBe('Главная')
    expect(items[1].text).toBe('О сайте')
  })

  test('returns 4 items when authenticated', () => {
    const state = {
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items).toHaveLength(4)
    expect(items[2].text).toBe('Профиль')
    expect(items[2].authOnly).toBe(true)
    expect(items[3].text).toBe('Статьи')
    expect(items[3].authOnly).toBe(true)
  })

  test('profile path includes the authenticated user id', () => {
    const state = {
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
    } as unknown as RootState

    const items = getSidebarItems(state)

    expect(items[2].path).toContain('42')
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=getSidebarItems.test
```

Expected: PASS (3 tests)

- [ ] **Step 3: Commit**

```bash
git add src/widgets/sidebar/model/selectors/getSidebarItems.test.ts
git commit -m "test: add getSidebarItems selector tests"
```

---

### Task 4: articlesPageSlice tests (reducer + selectors)

`articlesPageSlice` uses an entity adapter. Selectors are accessed via `articlesPageSlice.selectors`
(RTK wraps them to accept `{ articlesPage: ... }`). `getArticles` is the entity adapter's selector set,
accessed via `state.articlesPage`.

**Files:**

- Create: `src/pages/ArticlesPage/model/slices/articlesPageSlice.test.ts`

- [ ] **Step 1: Write the test**

```ts
import {
  ArticleType,
  ArticleView,
} from '@/entities/article/model/types/article'
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList'
import {
  articlesPageActions,
  articlesPageReducer,
  articlesPageSlice,
  getArticles,
} from './articlesPageSlice'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { Article } from '@/entities/article'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import type { RootState } from '@/app/store'

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  subtitle: 'subtitle',
  img: '',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
  user: { id: '1', username: 'admin' },
}

describe('articlesPageSlice.test', () => {
  describe('reducer', () => {
    test('fetchArticlesList pending sets isLoading=true and clears error', () => {
      const state: Partial<ArticlesPageSchema> = {
        isLoading: false,
        error: 'old error',
      }
      expect(
        articlesPageReducer(state as ArticlesPageSchema, {
          type: fetchArticlesList.pending.type,
        }),
      ).toMatchObject({ isLoading: true, error: undefined })
    })

    test('fetchArticlesList fulfilled sets articles and isLoading=false', () => {
      const state: Partial<ArticlesPageSchema> = {
        isLoading: true,
        ids: [],
        entities: {},
      }
      const result = articlesPageReducer(state as ArticlesPageSchema, {
        type: fetchArticlesList.fulfilled.type,
        payload: [mockArticle],
      })
      expect(result.isLoading).toBe(false)
      expect(result.ids).toEqual(['1'])
      expect(result.entities['1']).toEqual(mockArticle)
    })

    test('fetchArticlesList rejected sets error and isLoading=false', () => {
      const state: Partial<ArticlesPageSchema> = { isLoading: true }
      expect(
        articlesPageReducer(state as ArticlesPageSchema, {
          type: fetchArticlesList.rejected.type,
          payload: 'error',
        }),
      ).toMatchObject({ isLoading: false, error: 'error' })
    })

    test('setView updates view and persists to localStorage', () => {
      const state: Partial<ArticlesPageSchema> = { view: ArticleView.SMALL }
      articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.setView(ArticleView.BIG),
      )
      expect(localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY)).toBe(
        ArticleView.BIG,
      )
    })

    test('initState reads view from localStorage', () => {
      localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.BIG)
      const state: Partial<ArticlesPageSchema> = { view: ArticleView.SMALL }
      const result = articlesPageReducer(
        state as ArticlesPageSchema,
        articlesPageActions.initState(),
      )
      expect(result.view).toBe(ArticleView.BIG)
    })
  })

  describe('selectors', () => {
    const mockSelectors = articlesPageSlice.selectors

    test('getArticlesPageIsLoading returns isLoading', () => {
      const state = {
        articlesPage: {
          isLoading: true,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
        },
      }
      expect(mockSelectors.getArticlesPageIsLoading(state)).toBe(true)
    })

    test('getArticlesPageIsLoading returns false as default', () => {
      const state = {
        articlesPage: {
          isLoading: undefined,
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
        },
      }
      expect(mockSelectors.getArticlesPageIsLoading(state)).toBe(false)
    })

    test('getArticlesPageError returns error', () => {
      const state = {
        articlesPage: {
          error: 'some error',
          ids: [],
          entities: {},
          view: ArticleView.SMALL,
        },
      }
      expect(mockSelectors.getArticlesPageError(state)).toBe('some error')
    })

    test('getArticlesPageView returns view', () => {
      const state = {
        articlesPage: { view: ArticleView.BIG, ids: [], entities: {} },
      }
      expect(mockSelectors.getArticlesPageView(state)).toBe(ArticleView.BIG)
    })

    test('getArticlesPageView returns SMALL as default', () => {
      const state = { articlesPage: { view: undefined, ids: [], entities: {} } }
      expect(mockSelectors.getArticlesPageView(state)).toBe(ArticleView.SMALL)
    })
  })

  describe('getArticles entity selectors', () => {
    test('selectAll returns all articles', () => {
      const state = {
        articlesPage: {
          ids: ['1'],
          entities: { '1': mockArticle },
          isLoading: false,
          view: ArticleView.SMALL,
        },
      } as unknown as RootState

      expect(getArticles.selectAll(state)).toEqual([mockArticle])
    })

    test('selectById returns article by id', () => {
      const state = {
        articlesPage: {
          ids: ['1'],
          entities: { '1': mockArticle },
          isLoading: false,
          view: ArticleView.SMALL,
        },
      } as unknown as RootState

      expect(getArticles.selectById(state, '1')).toEqual(mockArticle)
    })

    test('selectAll returns empty array when articlesPage is undefined', () => {
      const state = {} as unknown as RootState
      expect(getArticles.selectAll(state)).toEqual([])
    })
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=articlesPageSlice.test
```

Expected: PASS (12 tests)

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArticlesPage/model/slices/articlesPageSlice.test.ts
git commit -m "test: add articlesPageSlice reducer and selector tests"
```

---

### Task 5: loginByUsername thunk tests

`loginByUsername` POSTs to `/login`, saves the user to `localStorage`, dispatches `userActions.setAuthData`,
and navigates to the profile page. On failure it rejects with a Russian error string.

**Files:**

- Create: `src/features/authByUsername/model/services/loginByUsername/loginByUsername.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { loginByUsername } from './loginByUsername'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage'
import type { User } from '@/entities/user'

const mockUser: User = { id: '1', username: 'admin' }

describe('loginByUsername.test', () => {
  test('success: fulfills, stores user in localStorage, dispatches setAuthData, navigates', async () => {
    const thunk = new TestAsyncThunk<
      User,
      { username: string; password: string },
      string
    >(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: mockUser }))

    const result = await thunk.callThunk({
      username: 'admin',
      password: 'pass',
    })

    expect(thunk.api.post).toHaveBeenCalledWith('http://localhost:8000/login', {
      username: 'admin',
      password: 'pass',
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockUser)
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(
      JSON.stringify(mockUser),
    )
    // dispatch: [pending, setAuthData, fulfilled] = 3 calls
    expect(thunk.dispatch).toHaveBeenCalledTimes(3)
    expect(thunk.nav).toHaveBeenCalledWith('/profile/')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<
      User,
      { username: string; password: string },
      string
    >(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk({
      username: 'admin',
      password: 'wrong',
    })

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('Вы ввели неверный логин или пароль')
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<
      User,
      { username: string; password: string },
      string
    >(loginByUsername)
    thunk.api.post.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk({
      username: 'admin',
      password: 'pass',
    })

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('Вы ввели неверный логин или пароль')
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=loginByUsername.test
```

Expected: PASS (3 tests)

- [ ] **Step 3: Commit**

```bash
git add src/features/authByUsername/model/services/loginByUsername/loginByUsername.test.ts
git commit -m "test: add loginByUsername thunk tests"
```

---

### Task 6: fetchArticleById thunk tests

`fetchArticleById` GETs `/articles/{id}`, returns the `Article` object, or rejects with `'error'`
when data is absent or the request fails.

**Files:**

- Create: `src/entities/article/model/services/fetchArticleById/fetchArticleById.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { fetchArticleById } from './fetchArticleById'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import { ArticleType } from '../../types/article'
import type { Article } from '../../types/article'

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  subtitle: '',
  img: '',
  views: 0,
  createdAt: '',
  type: [ArticleType.IT],
  blocks: [],
  user: { id: '1', username: 'admin' },
}

describe('fetchArticleById.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(fetchArticleById)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticle }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalledWith('/articles/1')
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockArticle)
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(fetchArticleById)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Article, string, string>(fetchArticleById)
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=fetchArticleById.test
```

Expected: PASS (3 tests)

- [ ] **Step 3: Commit**

```bash
git add src/entities/article/model/services/fetchArticleById/fetchArticleById.test.ts
git commit -m "test: add fetchArticleById thunk tests"
```

---

### Task 7: fetchArticlesList thunk tests

`fetchArticlesList` GETs `/articles` with `_expand: 'user'` param and returns an `Article[]`.
Rejects with `'error'` when data is absent or the request fails.

**Files:**

- Create: `src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { fetchArticlesList } from './fetchArticlesList'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import { ArticleType } from '@/entities/article/model/types/article'
import type { Article } from '@/entities/article'

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Article 1',
    subtitle: '',
    img: '',
    views: 0,
    createdAt: '',
    type: [ArticleType.IT],
    blocks: [],
    user: { id: '1', username: 'admin' },
  },
]

describe('fetchArticlesList.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Article[], void, string>(fetchArticlesList)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }))

    const result = await thunk.callThunk()

    expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
      params: { _expand: 'user' },
    })
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(mockArticles)
  })

  test('reject when response has no data', async () => {
    const thunk = new TestAsyncThunk<Article[], void, string>(fetchArticlesList)
    thunk.api.get.mockReturnValue(Promise.resolve({ data: undefined }))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Article[], void, string>(fetchArticlesList)
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk()

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
```

- [ ] **Step 2: Run the test**

```
yarn test:unit --testPathPattern=fetchArticlesList.test
```

Expected: PASS (3 tests)

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList.test.ts
git commit -m "test: add fetchArticlesList thunk tests"
```
