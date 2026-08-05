# Tests and Stories Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Закрыть пробелы в покрытии unit-тестами и Storybook stories: slice/services вокруг комментариев и страницы статьи, страницы без stories, виджеты без stories.

**Architecture:** Все изменения локализованы в FSD-слоях `features`, `entities`, `pages`, `widgets`. Тесты используют существующий хелпер `TestAsyncThunk` и прямой вызов reducer'ов. Stories используют `StoreDecorator` для компонентов, читающих Redux. Один итоговый commit (Task 14).

**Tech Stack:** Jest 30, @testing-library/react, Storybook 10 (react-webpack5), Redux Toolkit, TypeScript 5.9.

**Spec:** `docs/superpowers/specs/2026-05-18-tests-and-stories-design.md`

---

## Tier 1 — Comments / Article details

### Task 1: Slice-тест addCommentFormSlice

**Files:**

- Create: `src/features/addCommentForm/model/slices/addCommentFormSlice.test.ts`

Slice имеет initial state `{ text: '' }` и единственный reducer `setText`. Тест проверяет, что reducer корректно обновляет `text`.

- [ ] **Step 1: Создать тестовый файл**

```ts
import {
  addCommentFormActions,
  addCommentFormReducer,
} from './addCommentFormSlice'
import type { AddCommentFormSchema } from '../types/addCommentForm'
import type { DeepPartial } from '@/shared/types'

describe('addCommentFormSlice.test', () => {
  test('setText updates text', () => {
    const state: DeepPartial<AddCommentFormSchema> = { text: '' }

    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('hello'),
      ),
    ).toEqual({ text: 'hello' })
  })

  test('setText overwrites previous text', () => {
    const state: DeepPartial<AddCommentFormSchema> = { text: 'old' }

    expect(
      addCommentFormReducer(
        state as AddCommentFormSchema,
        addCommentFormActions.setText('new'),
      ),
    ).toEqual({ text: 'new' })
  })
})
```

- [ ] **Step 2: Запустить тест**

Run: `yarn test:unit --testPathPattern=addCommentFormSlice`
Expected: `PASS  src/features/addCommentForm/model/slices/addCommentFormSlice.test.ts` — 2 теста зелёные.

---

### Task 2: Async-thunk тест fetchCommentsByArticleId

**Files:**

- Create: `src/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId.test.ts`

Thunk делает GET `/comments?articleId=...&_expand=user`. При отсутствии `articleId` сразу возвращает `rejected`. Тест по образцу `fetchProfileData.test.ts`.

- [ ] **Step 1: Создать тестовый файл**

```ts
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Comment } from '@/entities/comment'

const comments: Comment[] = [
  {
    id: '1',
    text: 'comment 1',
    user: { id: '1', username: 'admin' },
  },
]

describe('fetchCommentsByArticleId.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )
    thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }))

    const result = await thunk.callThunk('1')

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(comments)
  })

  test('reject when articleId is missing', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )

    const result = await thunk.callThunk(undefined)

    expect(thunk.api.get).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Comment[], string | undefined, string>(
      fetchCommentsByArticleId,
    )
    thunk.api.get.mockReturnValue(Promise.reject(new Error('network')))

    const result = await thunk.callThunk('1')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
```

- [ ] **Step 2: Запустить тест**

Run: `yarn test:unit --testPathPattern=fetchCommentsByArticleId`
Expected: 3 теста зелёные.

---

### Task 3: Async-thunk тест addCommentForArticle

**Files:**

- Create: `src/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle.test.ts`

Thunk:

1. Достаёт `userAuthData` и `articleDetailsData` из state.
2. Если нет user/text/article — `rejectWithValue('no data')`.
3. POST `/comments` с `{ articleId, userId, text }`.
4. Dispatches `fetchCommentsByArticleId(article.id)`.

Образец — `updateProfileData.test.ts`.

- [ ] **Step 1: Создать тестовый файл**

```ts
import { addCommentForArticle } from './addCommentForArticle'
import { ArticleType } from '@/entities/article'
import { TestAsyncThunk } from '@/shared/lib/tests/async.thunk.tests'
import type { Article } from '@/entities/article'
import type { Comment } from '@/entities/comment'

const article: Article = {
  id: '1',
  title: 'Test',
  subtitle: 'sub',
  img: 'img',
  views: 1,
  createdAt: '01.01.2026',
  type: [ArticleType.IT],
  blocks: [],
}

const user = { id: '42', username: 'admin' }

const baseState = {
  user: { authData: user, _inited: true },
  articleDetails: {
    data: article,
    isLoading: false,
  },
}

const newComment: Comment = {
  id: '7',
  text: 'hello',
  user,
}

describe('addCommentForArticle.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )
    thunk.api.post.mockReturnValue(Promise.resolve({ data: newComment }))

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
      articleId: '1',
      userId: '42',
      text: 'hello',
    })
    expect(thunk.dispatch).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(newComment)
  })

  test('reject when no userData', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      {
        user: { _inited: true },
        articleDetails: { data: article, isLoading: false },
      },
    )

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject when text is empty', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )

    const result = await thunk.callThunk('')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject when no article', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      {
        user: { authData: user, _inited: true },
        articleDetails: { isLoading: false },
      },
    )

    const result = await thunk.callThunk('hello')

    expect(thunk.api.post).not.toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('no data')
  })

  test('reject on api error', async () => {
    const thunk = new TestAsyncThunk<Comment, string, string>(
      addCommentForArticle,
      baseState,
    )
    thunk.api.post.mockReturnValue(Promise.reject(new Error('boom')))

    const result = await thunk.callThunk('hello')

    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toBe('error')
  })
})
```

- [ ] **Step 2: Запустить тест**

Run: `yarn test:unit --testPathPattern=addCommentForArticle`
Expected: 5 тестов зелёные.

---

### Task 4: Slice-тест articleDetailsCommentsSlice

**Files:**

- Create: `src/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice.test.ts`

Slice использует `createEntityAdapter`. ExtraReducers для `fetchCommentsByArticleId`: pending/fulfilled/rejected. На `fulfilled` адаптер выполняет `setAll`.

- [ ] **Step 1: Создать тестовый файл**

```ts
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'
import type { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import type { Comment } from '@/entities/comment'
import type { DeepPartial } from '@/shared/types'

const comments: Comment[] = [
  {
    id: '1',
    text: 'first',
    user: { id: '1', username: 'admin' },
  },
  {
    id: '2',
    text: 'second',
    user: { id: '2', username: 'anton' },
  },
]

const emptyState: DeepPartial<ArticleDetailsCommentsSchema> = {
  ids: [],
  entities: {},
  isLoading: false,
  error: undefined,
}

describe('articleDetailsCommentsSlice.test', () => {
  test('fetchCommentsByArticleId.pending sets isLoading=true and clears error', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: false,
      error: 'previous error',
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      fetchCommentsByArticleId.pending('', '1'),
    )

    expect(result.isLoading).toBe(true)
    expect(result.error).toBeUndefined()
  })

  test('fetchCommentsByArticleId.fulfilled sets comments via adapter', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: undefined,
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      fetchCommentsByArticleId.fulfilled(comments, '', '1'),
    )

    expect(result.isLoading).toBe(false)
    expect(result.ids).toEqual(['1', '2'])
    expect(result.entities['1']).toEqual(comments[0])
    expect(result.entities['2']).toEqual(comments[1])
  })

  test('fetchCommentsByArticleId.rejected sets isLoading=false and error', () => {
    const state: DeepPartial<ArticleDetailsCommentsSchema> = {
      ids: [],
      entities: {},
      isLoading: true,
      error: undefined,
    }

    const result = articleDetailsCommentsReducer(
      state as ArticleDetailsCommentsSchema,
      {
        type: fetchCommentsByArticleId.rejected.type,
        payload: 'error',
        error: { message: 'Rejected' },
        meta: {
          arg: '1',
          requestId: '',
          requestStatus: 'rejected',
          aborted: false,
          condition: false,
          rejectedWithValue: true,
        },
      },
    )

    expect(result.isLoading).toBe(false)
    expect(result.error).toBe('error')
  })
})
```

> **Note:** Для `rejected` мы конструируем action вручную, так как `fetchCommentsByArticleId.rejected('error', '', '1')` в RTK имеет более сложную сигнатуру. Используем явный action-объект с `type` и `payload`.

- [ ] **Step 2: Запустить тест**

Run: `yarn test:unit --testPathPattern=articleDetailsCommentsSlice`
Expected: 3 теста зелёные.

---

### Task 5: Починить story AddCommentForm

**Files:**

- Modify: `src/features/addCommentForm/ui/AddCommentForm/AddCommentForm.stories.tsx`

Сейчас smoke-test падает по таймауту, потому что компонент использует `useAppSelector(selectText)` без `StoreProvider`. Добавляем `StoreDecorator`.

- [ ] **Step 1: Заменить содержимое файла**

```tsx
import AddCommentForm from './AddCommentForm'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  args: {
    onSendComment: () => {},
  },
  decorators: [
    StoreDecorator({
      addCommentForm: { text: '' },
    }),
  ],
} satisfies Meta<typeof AddCommentForm>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const WithText: Story = {
  decorators: [
    StoreDecorator({
      addCommentForm: { text: 'Уже введённый комментарий' },
    }),
  ],
}
```

- [ ] **Step 2: Проверить, что TS компилируется**

Run: `yarn lint:ts`
Expected: без ошибок (или ошибки только по другим файлам, не связанным с этой стори).

---

### Task 6: Story ArticleDetailsPage

**Files:**

- Create: `src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.stories.tsx`

Страница использует `useParams<{ id: string }>()`. Глобальный `RouterDecorator` — `BrowserRouter`, в котором `id` будет undefined → компонент покажет «Статья не найдена». Чтобы показать полный кейс, оборачиваем во вложенный `MemoryRouter` + `Routes`.

- [ ] **Step 1: Создать файл story**

```tsx
import { MemoryRouter, Route, Routes } from 'react-router'
import ArticleDetailsPage from './ArticleDetailsPage'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'
import type { Article } from '@/entities/article'
import type { Comment } from '@/entities/comment'
import type { Decorator } from '@storybook/react'

const meta = {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
} satisfies Meta<typeof ArticleDetailsPage>

export default meta
type Story = StoryObj<typeof meta>

const article: Article = {
  id: '1',
  title: 'Javascript news',
  subtitle: 'Что нового в JS',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2026',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок',
      paragraphs: ['Текст параграфа.'],
    },
  ],
}

const comments: Comment[] = [
  {
    id: '1',
    text: 'Первый комментарий',
    user: { id: '1', username: 'admin' },
  },
  {
    id: '2',
    text: 'Второй комментарий',
    user: { id: '2', username: 'anton' },
  },
]

const RouteWithIdDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/articles/1']}>
    <Routes>
      <Route path='/articles/:id' element={<Story />} />
    </Routes>
  </MemoryRouter>
)

export const Normal: Story = {
  decorators: [
    RouteWithIdDecorator,
    StoreDecorator({
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
      articleDetails: { isLoading: false, data: article },
      articleDetailsComments: {
        isLoading: false,
        ids: ['1', '2'],
        entities: { 1: comments[0], 2: comments[1] },
      },
    }),
  ],
}

export const NoArticle: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: { id: '42', username: 'admin' }, _inited: true },
    }),
  ],
}
```

> **Note:** `NoArticle` использует глобальный `BrowserRouter` (без `:id`) → внутри страницы сработает ветка «Статья не найдена», что соответствует негативному кейсу.

- [ ] **Step 2: Проверить, что TS компилируется**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

## Tier 2 — Page stories

### Task 7: Story MainPage

**Files:**

- Create: `src/pages/mainPage/ui/MainPage.stories.tsx`

`MainPage` рендерит `Navbar`/`Sidebar`/`<Outlet />`. Navbar/Sidebar читают `user.authData`. Передаём минимальный стор с auth-пользователем.

- [ ] **Step 1: Создать файл**

```tsx
import MainPage from './MainPage'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/MainPage',
  component: MainPage,
} satisfies Meta<typeof MainPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      user: { authData: { id: '1', username: 'admin' }, _inited: true },
    }),
  ],
}

export const NoAuth: Story = {
  decorators: [StoreDecorator({ user: { _inited: true } })],
}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

### Task 8: Story AboutPage

**Files:**

- Create: `src/pages/aboutPage/ui/AboutPage.stories.tsx`

`AboutPage` рендерит `BugButton` + i18n строку. Стор не нужен.

- [ ] **Step 1: Создать файл**

```tsx
import AboutPage from './AboutPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/AboutPage',
  component: AboutPage,
} satisfies Meta<typeof AboutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

### Task 9: Story NotFoundPage

**Files:**

- Create: `src/pages/notFoundPage/ui/NotFoundPage.stories.tsx`

`NotFoundPage` — экспортирован как named export. Статичный текст + i18n. Стор не нужен.

- [ ] **Step 1: Создать файл**

```tsx
import { NotFoundPage } from './NotFoundPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

### Task 10: Story ArticlesPage

**Files:**

- Create: `src/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.stories.tsx`

`ArticlesPage` сейчас простой — рендерит только локализованный текст. Стор не нужен.

- [ ] **Step 1: Создать файл**

```tsx
import ArticlesPage from './ArticlesPage'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
} satisfies Meta<typeof ArticlesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

## Tier 3 — Widget stories

### Task 11: Story AppLoader

**Files:**

- Create: `src/widgets/appLoader/ui/AppLoader.stories.tsx`

`AppLoader` — простой враппер над `RollerLoader`. Стор не нужен.

- [ ] **Step 1: Создать файл**

```tsx
import { AppLoader } from './AppLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/AppLoader',
  component: AppLoader,
} satisfies Meta<typeof AppLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

### Task 12: Story LangSwitcher

**Files:**

- Create: `src/widgets/langSwticher/ui/LangSwitcher.stories.tsx`

`LangSwitcher` — кнопка на основе i18n. Имеет prop `short`. Сделаем два варианта.

- [ ] **Step 1: Создать файл**

```tsx
import { LangSwitcher } from './LangSwitcher'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/LangSwitcher',
  component: LangSwitcher,
} satisfies Meta<typeof LangSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}

export const Short: Story = {
  args: { short: true },
}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

### Task 13: Story PageLoader

**Files:**

- Create: `src/widgets/pageLoader/ui/PageLoader.stories.tsx`

`PageLoader` — простой враппер над `GridLoader`.

- [ ] **Step 1: Создать файл**

```tsx
import { PageLoader } from './PageLoader'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'widget/PageLoader',
  component: PageLoader,
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {}
```

- [ ] **Step 2: Проверить TS**

Run: `yarn lint:ts`
Expected: без новых ошибок.

---

## Финал — единый коммит

### Task 14: Прогон всего и commit

- [ ] **Step 1: Запустить весь unit-suite**

Run: `yarn test:unit`
Expected: все тесты зелёные (включая 4 новых файла).

- [ ] **Step 2: Запустить TS-проверку**

Run: `yarn lint:ts`
Expected: без ошибок.

- [ ] **Step 3: Запустить ESLint**

Run: `yarn lint:es:quiet`
Expected: без ошибок. Если линт ругается на новые файлы — исправить точечно (например, порядок импортов).

- [ ] **Step 4: Закоммитить**

```bash
git add \
  src/features/addCommentForm/model/slices/addCommentFormSlice.test.ts \
  src/features/addCommentForm/ui/AddCommentForm/AddCommentForm.stories.tsx \
  src/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId.test.ts \
  src/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle.test.ts \
  src/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice.test.ts \
  src/pages/ArticleDetailsPage/ui/ArticleDetailsPage/ArticleDetailsPage.stories.tsx \
  src/pages/mainPage/ui/MainPage.stories.tsx \
  src/pages/aboutPage/ui/AboutPage.stories.tsx \
  src/pages/notFoundPage/ui/NotFoundPage.stories.tsx \
  src/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.stories.tsx \
  src/widgets/appLoader/ui/AppLoader.stories.tsx \
  src/widgets/langSwticher/ui/LangSwitcher.stories.tsx \
  src/widgets/pageLoader/ui/PageLoader.stories.tsx

git commit -m "test: add unit tests and storybook stories for coverage gaps"
```

> **Note:** Не использовать `git add -A`/`.` — иначе подхватит изменения в `json-server/db.json` и другие незакоммиченные правки, не относящиеся к скоупу.

---

## Зависимости и порядок

- Tier 1 → Tier 2 → Tier 3 → финальный commit. Внутри tier'а порядок неважен, но рекомендую в указанном — он отражает естественную последовательность чтения.
- Все unit-тесты можно прогонять локально (`--testPathPattern`) без поднятия dev-окружения.
- Storybook smoke-test (`yarn test:ui`) требует поднятого storybook server'а; в этом плане не запускаем — TS + ESLint достаточны для гарантии того, что story-файлы валидны. Smoke-test пройдёт автоматически в CI или при следующем `yarn test:ui:ci`.

## Скоуп — что НЕ делаем

- Render-тесты `shared/ui` и виджетов, уже покрытых screenshot-тестами.
- Stories для `entities/user` (UI нет).
- Stories для `EditableProfileCard` (только тонкая обёртка).
- Тесты на `CommentCard`/`CommentList`/`AddCommentForm` — уже покрыты Storybook smoke + image-snapshot.
