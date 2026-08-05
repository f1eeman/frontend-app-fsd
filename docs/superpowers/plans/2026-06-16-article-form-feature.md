# articleForm Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a single `articleForm` feature that handles both article creation and editing with full block management (TEXT/CODE/IMAGE).

**Architecture:** Flat Redux slice (`articleFormSlice`) manages all form state. Two thunks handle data fetching (`fetchArticleForEdit`) and saving (`saveArticle`). Pages become thin wrappers that mount `<ArticleForm articleId? />`.

**Tech Stack:** React, Redux Toolkit (`createSlice` + `injectInto`), TypeScript, CSS Modules, Storybook, Jest

**Conventions note:** A husky pre-commit hook runs `prettier --write` + `eslint --fix` + `tsc-files --noEmit` on staged files. The import blocks in this plan are grouped for readability, NOT in the exact order the `import/order` rule enforces (the rule wants: external → parent `../` → sibling `./` incl. `*.module.scss` → internal `@/**` → type-only imports last). `eslint --fix` reorders them automatically on commit, so do not hand-tune ordering — just expect the committed files to look reordered. Two things `eslint --fix` will NOT fix and that break the commit: `react-hooks/rules-of-hooks` violations (never call a hook inside JSX/callbacks — always hoist `useCallback` to the component body) and type errors. All `*.tsx` user-facing strings must go through `t()` (the `i18next/no-literal-string` rule is off only for `*.test.tsx` and `*.stories.tsx`).

---

## File Map

**Create:**

- `src/features/articleForm/model/types/articleFormSchema.ts`
- `src/features/articleForm/model/slices/articleFormSlice.ts`
- `src/features/articleForm/model/slices/articleFormSlice.test.ts`
- `src/features/articleForm/model/services/validateArticleForm/validateArticleForm.ts`
- `src/features/articleForm/model/services/validateArticleForm/validateArticleForm.test.ts`
- `src/features/articleForm/model/services/fetchArticleForEdit/fetchArticleForEdit.ts`
- `src/features/articleForm/model/services/saveArticle/saveArticle.ts`
- `src/features/articleForm/model/selectors/articleFormSelectors.ts`
- `src/features/articleForm/ui/ArticleForm/ArticleForm.tsx`
- `src/features/articleForm/ui/ArticleForm/ArticleForm.module.scss`
- `src/features/articleForm/ui/ArticleForm/ArticleForm.stories.tsx`
- `src/features/articleForm/ui/ArticleForm/ArticleFormFields.tsx`
- `src/features/articleForm/ui/ArticleForm/ArticleFormFields.module.scss`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.tsx`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.module.scss`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.tsx`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.module.scss`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleTextBlockEditor.tsx`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleTextBlockEditor.module.scss`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleCodeBlockEditor.tsx`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleCodeBlockEditor.module.scss`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleImageBlockEditor.tsx`
- `src/features/articleForm/ui/ArticleForm/blocks/ArticleImageBlockEditor.module.scss`
- `src/features/articleForm/index.ts`

**Modify:**

- `src/entities/article/index.ts` — export block types
- `src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.tsx`
- `src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.stories.tsx`
- `src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.tsx`
- `src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.stories.tsx`

---

### Task 1: Export block types from entity public API

**Files:**

- Modify: `src/entities/article/index.ts`

- [ ] **Step 1: Add missing exports**

```typescript
// src/entities/article/index.ts — replace existing export block for article types:
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export {
  Article,
  ArticleSortField,
  ArticleType,
  ArticleView,
  ArticleBlockType,
  type ArticleBlock,
  type ArticleCodeBlock,
  type ArticleTextBlock,
  type ArticleImageBlock,
} from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export { ArticleList } from './ui/ArticleList/ArticleList'
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector'
export { ArticleSortSelector } from './ui/ArticleSortSelector/ArticleSortSelector'
export { ArticleTypeTabs } from './ui/ArticleTypeTabs/ArticleTypeTabs'
export { getArticleDetailsData } from './model/slice/articleDetailsSlice'
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
yarn lint:ts
```

Expected: no errors related to article entity exports.

- [ ] **Step 3: Commit**

```bash
git add src/entities/article/index.ts
git commit -m "feat(entities/article): export block types from public API"
```

---

### Task 2: Schema types

**Files:**

- Create: `src/features/articleForm/model/types/articleFormSchema.ts`

- [ ] **Step 1: Create the types file**

```typescript
// src/features/articleForm/model/types/articleFormSchema.ts
import type { ArticleBlock, ArticleType } from '@/entities/article'

export interface ArticleFormData {
  title: string
  subtitle: string
  img: string
  type: ArticleType[]
  blocks: ArticleBlock[]
}

export interface ArticleFormSchema {
  formData: ArticleFormData
  isLoading: boolean
  error?: string
  validateError?: string
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/articleForm/model/types/articleFormSchema.ts
git commit -m "feat(articleForm): add schema types"
```

---

### Task 3: Slice + tests

**Files:**

- Create: `src/features/articleForm/model/slices/articleFormSlice.ts`
- Create: `src/features/articleForm/model/slices/articleFormSlice.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// src/features/articleForm/model/slices/articleFormSlice.test.ts
import { articleFormActions, articleFormReducer } from './articleFormSlice'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import type { ArticleFormSchema } from '../types/articleFormSchema'

const emptyState: ArticleFormSchema = {
  formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
  isLoading: false,
}

describe('articleFormSlice', () => {
  test('setTitle updates title and clears validateError', () => {
    const state: ArticleFormSchema = { ...emptyState, validateError: 'error' }
    const result = articleFormReducer(
      state,
      articleFormActions.setTitle('Hello'),
    )
    expect(result.formData.title).toBe('Hello')
    expect(result.validateError).toBeUndefined()
  })

  test('toggleType adds type when absent', () => {
    const result = articleFormReducer(
      emptyState,
      articleFormActions.toggleType(ArticleType.IT),
    )
    expect(result.formData.type).toContain(ArticleType.IT)
  })

  test('toggleType removes type when present', () => {
    const state: ArticleFormSchema = {
      ...emptyState,
      formData: { ...emptyState.formData, type: [ArticleType.IT] },
    }
    const result = articleFormReducer(
      state,
      articleFormActions.toggleType(ArticleType.IT),
    )
    expect(result.formData.type).not.toContain(ArticleType.IT)
  })

  test('addBlock creates block of correct type with unique id', () => {
    const r1 = articleFormReducer(
      emptyState,
      articleFormActions.addBlock(ArticleBlockType.CODE),
    )
    const r2 = articleFormReducer(
      r1,
      articleFormActions.addBlock(ArticleBlockType.CODE),
    )
    expect(r2.formData.blocks).toHaveLength(2)
    expect(r2.formData.blocks[0].type).toBe(ArticleBlockType.CODE)
    expect(r2.formData.blocks[0].id).not.toBe(r2.formData.blocks[1].id)
  })

  test('removeBlock removes only the target block', () => {
    const state: ArticleFormSchema = {
      ...emptyState,
      formData: {
        ...emptyState.formData,
        blocks: [
          { id: 'a', type: ArticleBlockType.CODE, code: '' },
          { id: 'b', type: ArticleBlockType.CODE, code: '' },
        ],
      },
    }
    const result = articleFormReducer(
      state,
      articleFormActions.removeBlock('a'),
    )
    expect(result.formData.blocks).toHaveLength(1)
    expect(result.formData.blocks[0].id).toBe('b')
  })

  test('updateBlock patches only the target block', () => {
    const state: ArticleFormSchema = {
      ...emptyState,
      formData: {
        ...emptyState.formData,
        blocks: [
          { id: 'a', type: ArticleBlockType.CODE, code: 'old' },
          { id: 'b', type: ArticleBlockType.CODE, code: 'unchanged' },
        ],
      },
    }
    const result = articleFormReducer(
      state,
      articleFormActions.updateBlock({ id: 'a', changes: { code: 'new' } }),
    )
    const a = result.formData.blocks.find((bl) => bl.id === 'a') as {
      code: string
    }
    const b = result.formData.blocks.find((bl) => bl.id === 'b') as {
      code: string
    }
    expect(a.code).toBe('new')
    expect(b.code).toBe('unchanged')
  })

  test('initForm populates formData from article', () => {
    const article = {
      id: '1',
      title: 'Test',
      subtitle: 'Sub',
      img: 'img.jpg',
      type: [ArticleType.IT],
      blocks: [],
      user: { id: '1', username: 'admin' },
      views: 0,
      createdAt: '',
    }
    const result = articleFormReducer(
      emptyState,
      articleFormActions.initForm(article),
    )
    expect(result.formData.title).toBe('Test')
    expect(result.formData.type).toEqual([ArticleType.IT])
    expect(result.validateError).toBeUndefined()
  })

  test('resetForm clears all form data', () => {
    const state: ArticleFormSchema = {
      formData: {
        title: 'Old',
        subtitle: 'Sub',
        img: 'img',
        type: [ArticleType.IT],
        blocks: [],
      },
      isLoading: true,
      error: 'err',
      validateError: 'valErr',
    }
    const result = articleFormReducer(state, articleFormActions.resetForm())
    expect(result.formData.title).toBe('')
    expect(result.formData.type).toEqual([])
    expect(result.isLoading).toBe(false)
    expect(result.error).toBeUndefined()
    expect(result.validateError).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL (articleFormReducer not defined)**

```bash
yarn test:unit --testPathPattern="articleFormSlice"
```

Expected: FAIL with "Cannot find module './articleFormSlice'"

- [ ] **Step 3: Implement the slice**

```typescript
// src/features/articleForm/model/slices/articleFormSlice.ts
import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import {
  ArticleBlockType,
  ArticleType,
  type Article,
  type ArticleBlock,
  type ArticleCodeBlock,
  type ArticleImageBlock,
  type ArticleTextBlock,
} from '@/entities/article'
import { rootReducer } from '@/app/store'
import type { ArticleFormSchema } from '../types/articleFormSchema'

const articleFormSlice = createSlice({
  name: 'articleForm',
  initialState: {
    formData: {
      title: '',
      subtitle: '',
      img: '',
      type: [] as ArticleType[],
      blocks: [] as ArticleBlock[],
    },
    isLoading: false,
    error: undefined,
    validateError: undefined,
  } as ArticleFormSchema,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.formData.title = action.payload
      state.validateError = undefined
    },
    setSubtitle: (state, action: PayloadAction<string>) => {
      state.formData.subtitle = action.payload
    },
    setImg: (state, action: PayloadAction<string>) => {
      state.formData.img = action.payload
    },
    toggleType: (state, action: PayloadAction<ArticleType>) => {
      const type = action.payload
      const idx = state.formData.type.indexOf(type)
      if (idx === -1) {
        state.formData.type.push(type)
      } else {
        state.formData.type.splice(idx, 1)
      }
    },
    addBlock: (state, action: PayloadAction<ArticleBlockType>) => {
      const id = crypto.randomUUID()
      switch (action.payload) {
        case ArticleBlockType.TEXT:
          state.formData.blocks.push({
            id,
            type: ArticleBlockType.TEXT,
            paragraphs: [],
          } as ArticleTextBlock)
          break
        case ArticleBlockType.CODE:
          state.formData.blocks.push({
            id,
            type: ArticleBlockType.CODE,
            code: '',
          } as ArticleCodeBlock)
          break
        case ArticleBlockType.IMAGE:
          state.formData.blocks.push({
            id,
            type: ArticleBlockType.IMAGE,
            src: '',
            title: '',
          } as ArticleImageBlock)
          break
      }
    },
    removeBlock: (state, action: PayloadAction<string>) => {
      state.formData.blocks = state.formData.blocks.filter(
        (b) => b.id !== action.payload,
      )
    },
    updateBlock: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ArticleBlock> }>,
    ) => {
      const { id, changes } = action.payload
      const idx = state.formData.blocks.findIndex((b) => b.id === id)
      if (idx !== -1) {
        state.formData.blocks[idx] = {
          ...state.formData.blocks[idx],
          ...changes,
        } as ArticleBlock
      }
    },
    initForm: (state, action: PayloadAction<Article>) => {
      const { title, subtitle, img, type, blocks } = action.payload
      state.formData = { title, subtitle, img, type, blocks }
      state.validateError = undefined
      state.error = undefined
    },
    resetForm: (state) => {
      state.formData = {
        title: '',
        subtitle: '',
        img: '',
        type: [],
        blocks: [],
      }
      state.validateError = undefined
      state.error = undefined
      state.isLoading = false
    },
  },
  selectors: {
    selectFormData: (state) => state.formData,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectValidateError: (state) => state.validateError,
    selectTitle: (state) => state.formData.title,
    selectBlocks: (state) => state.formData.blocks,
  },
})

export const withArticleFormSlice = articleFormSlice.injectInto(rootReducer)
export const { actions: articleFormActions } = articleFormSlice
export const { reducer: articleFormReducer } = articleFormSlice
export const {
  selectFormData,
  selectIsLoading,
  selectError,
  selectValidateError,
  selectTitle,
  selectBlocks,
} = withArticleFormSlice.selectors

declare module '@/app/store' {
  export interface LazyLoadedSlices
    extends WithSlice<typeof articleFormSlice> {}
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
yarn test:unit --testPathPattern="articleFormSlice"
```

Expected: 8 tests pass. If `crypto.randomUUID` is not available in the test environment, add to the top of the test file: `globalThis.crypto = { randomUUID: () => Math.random().toString(36).slice(2) } as Crypto`

- [ ] **Step 5: Commit**

```bash
git add src/features/articleForm/model/slices/
git commit -m "feat(articleForm): add slice with block management actions"
```

---

### Task 4: Validation + tests

**Files:**

- Create: `src/features/articleForm/model/services/validateArticleForm/validateArticleForm.ts`
- Create: `src/features/articleForm/model/services/validateArticleForm/validateArticleForm.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// src/features/articleForm/model/services/validateArticleForm/validateArticleForm.test.ts
import { validateArticleForm } from './validateArticleForm'

describe('validateArticleForm', () => {
  test('returns error string when title is empty', () => {
    expect(validateArticleForm({ title: '' })).toBe('Заголовок обязателен')
  })

  test('returns error string when title is only whitespace', () => {
    expect(validateArticleForm({ title: '   ' })).toBe('Заголовок обязателен')
  })

  test('returns undefined when title is non-empty', () => {
    expect(validateArticleForm({ title: 'My Article' })).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
yarn test:unit --testPathPattern="validateArticleForm"
```

Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Implement**

```typescript
// src/features/articleForm/model/services/validateArticleForm/validateArticleForm.ts
export const validateArticleForm = (formData: {
  title: string
}): string | undefined => {
  if (!formData.title.trim()) {
    return 'Заголовок обязателен'
  }
  return undefined
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
yarn test:unit --testPathPattern="validateArticleForm"
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/features/articleForm/model/services/validateArticleForm/
git commit -m "feat(articleForm): add title validation"
```

---

### Task 5: Thunks + slice extraReducers

**Files:**

- Create: `src/features/articleForm/model/services/fetchArticleForEdit/fetchArticleForEdit.ts`
- Create: `src/features/articleForm/model/services/saveArticle/saveArticle.ts`
- Modify: `src/features/articleForm/model/slices/articleFormSlice.ts`

- [ ] **Step 1: Create fetchArticleForEdit**

```typescript
// src/features/articleForm/model/services/fetchArticleForEdit/fetchArticleForEdit.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Article } from '@/entities/article'
import type { ThunkConfig } from '@/app/store'

export const fetchArticleForEdit = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('articleForm/fetchArticleForEdit', async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<Article>(`/articles/${id}`, {
      params: { _expand: 'user' },
    })
    if (!response.data) throw new Error()
    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
```

- [ ] **Step 2: Create saveArticle**

`saveArticle` reads `formData` from the store via `selectFormData`. This creates a circular dependency with the slice (slice imports thunk for extraReducers, thunk imports selector from slice) — this is the same pattern used by `updateProfileData`/`profileSlice` and works because `selectFormData` is only called inside the async function body, not at module evaluation time.

```typescript
// src/features/articleForm/model/services/saveArticle/saveArticle.ts
import { createAsyncThunk } from '@reduxjs/toolkit'
import { selectFormData } from '../../slices/articleFormSlice'
import { validateArticleForm } from '../validateArticleForm/validateArticleForm'
import type { Article } from '@/entities/article'
import type { ThunkConfig } from '@/app/store'

export const saveArticle = createAsyncThunk<
  Article,
  { id?: string; onSuccess?: (id: string) => void },
  ThunkConfig<string>
>('articleForm/saveArticle', async ({ id, onSuccess }, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = selectFormData(getState())
  const validateError = validateArticleForm(formData)

  if (validateError) {
    return rejectWithValue(`VALIDATION:${validateError}`)
  }

  try {
    const response = id
      ? await extra.api.put<Article>(`/articles/${id}`, formData)
      : await extra.api.post<Article>('/articles', formData)

    if (!response.data) throw new Error()

    onSuccess?.(response.data.id)
    return response.data
  } catch {
    return rejectWithValue('error')
  }
})
```

- [ ] **Step 3: Add extraReducers to the slice**

Add these imports at the top of `articleFormSlice.ts` (after existing imports):

```typescript
import { fetchArticleForEdit } from '../services/fetchArticleForEdit/fetchArticleForEdit'
import { saveArticle } from '../services/saveArticle/saveArticle'
```

Add `extraReducers` to the `createSlice` call (after `selectors`):

```typescript
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleForEdit.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(fetchArticleForEdit.fulfilled, (state, action: PayloadAction<Article>) => {
        const { title, subtitle, img, type, blocks } = action.payload
        state.formData = { title, subtitle, img, type, blocks }
        state.isLoading = false
        state.validateError = undefined
        state.error = undefined
      })
      .addCase(fetchArticleForEdit.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(saveArticle.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(saveArticle.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(saveArticle.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload ?? ''
        if (payload.startsWith('VALIDATION:')) {
          state.validateError = payload.replace('VALIDATION:', '')
        } else {
          state.error = payload
        }
      })
  },
```

Also add `PayloadAction` to the import from `@reduxjs/toolkit` if not already imported.

- [ ] **Step 4: Run existing slice tests — expect still PASS**

```bash
yarn test:unit --testPathPattern="articleFormSlice"
```

Expected: 8 tests still pass (extraReducers don't affect reducer tests).

- [ ] **Step 5: Commit**

```bash
git add src/features/articleForm/model/services/ src/features/articleForm/model/slices/articleFormSlice.ts
git commit -m "feat(articleForm): add fetch and save thunks with slice extraReducers"
```

---

### Task 6: Selectors

**Files:**

- Create: `src/features/articleForm/model/selectors/articleFormSelectors.ts`

- [ ] **Step 1: Create selectors re-export file**

```typescript
// src/features/articleForm/model/selectors/articleFormSelectors.ts
export {
  selectFormData,
  selectIsLoading,
  selectError,
  selectValidateError,
  selectTitle,
  selectBlocks,
} from '../slices/articleFormSlice'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/articleForm/model/selectors/
git commit -m "feat(articleForm): add selectors barrel"
```

---

### Task 7: Block editors

**Files:**

- Create 3 editor components + their SCSS modules in `src/features/articleForm/ui/ArticleForm/blocks/`

- [ ] **Step 1: Create ArticleTextBlockEditor**

```typescript
// src/features/articleForm/ui/ArticleForm/blocks/ArticleTextBlockEditor.tsx
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme, Input } from '@/shared/ui'
import cls from './ArticleTextBlockEditor.module.scss'
import type { ArticleTextBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleTextBlock
  onChange: (changes: Partial<ArticleTextBlock>) => void
}

export const ArticleTextBlockEditor = memo(({ className = '', block, onChange }: Props) => {
  const { t } = useTranslation()

  const onTitleChange = useCallback(
    (value: string) => onChange({ title: value }),
    [onChange],
  )

  const onParagraphChange = useCallback(
    (value: string, index: number) => {
      const paragraphs = [...block.paragraphs]
      paragraphs[index] = value
      onChange({ paragraphs })
    },
    [block.paragraphs, onChange],
  )

  const addParagraph = useCallback(
    () => onChange({ paragraphs: [...block.paragraphs, ''] }),
    [block.paragraphs, onChange],
  )

  const removeParagraph = useCallback(
    (index: number) =>
      onChange({ paragraphs: block.paragraphs.filter((_, i) => i !== index) }),
    [block.paragraphs, onChange],
  )

  return (
    <div className={classNames(cls.ArticleTextBlockEditor, {}, [className])}>
      <Input
        placeholder={t('Заголовок блока (необязательно)')}
        value={block.title ?? ''}
        onChange={onTitleChange}
      />
      {block.paragraphs.map((p, i) => (
        <div key={i} className={cls.paragraph}>
          <textarea
            className={cls.textarea}
            value={p}
            onChange={(e) => onParagraphChange(e.target.value, i)}
            placeholder={t('Параграф')}
          />
          <Button theme={buttonTheme.outline} onClick={() => removeParagraph(i)}>
            {t('Удалить')}
          </Button>
        </div>
      ))}
      <Button theme={buttonTheme.outline} onClick={addParagraph}>
        {t('+ Параграф')}
      </Button>
    </div>
  )
})

ArticleTextBlockEditor.displayName = 'ArticleTextBlockEditor'
```

```scss
/* src/features/articleForm/ui/ArticleForm/blocks/ArticleTextBlockEditor.module.scss */
.ArticleTextBlockEditor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.paragraph {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.textarea {
  flex: 1;
  min-height: 80px;
  padding: 8px;
  resize: vertical;
  font-family: inherit;
  font-size: inherit;
}
```

- [ ] **Step 2: Create ArticleCodeBlockEditor**

```typescript
// src/features/articleForm/ui/ArticleForm/blocks/ArticleCodeBlockEditor.tsx
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleCodeBlockEditor.module.scss'
import type { ArticleCodeBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleCodeBlock
  onChange: (changes: Partial<ArticleCodeBlock>) => void
}

export const ArticleCodeBlockEditor = memo(({ className = '', block, onChange }: Props) => {
  const { t } = useTranslation()

  const onCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ code: e.target.value }),
    [onChange],
  )

  return (
    <div className={classNames(cls.ArticleCodeBlockEditor, {}, [className])}>
      <textarea
        className={cls.textarea}
        value={block.code}
        onChange={onCodeChange}
        placeholder={t('Код')}
      />
    </div>
  )
})

ArticleCodeBlockEditor.displayName = 'ArticleCodeBlockEditor'
```

```scss
/* src/features/articleForm/ui/ArticleForm/blocks/ArticleCodeBlockEditor.module.scss */
.ArticleCodeBlockEditor {
  display: flex;
  flex-direction: column;
}

.textarea {
  min-height: 120px;
  padding: 8px;
  resize: vertical;
  font-family: monospace;
  font-size: 14px;
}
```

- [ ] **Step 3: Create ArticleImageBlockEditor**

```typescript
// src/features/articleForm/ui/ArticleForm/blocks/ArticleImageBlockEditor.tsx
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui'
import cls from './ArticleImageBlockEditor.module.scss'
import type { ArticleImageBlock } from '@/entities/article'

interface Props {
  className?: string
  block: ArticleImageBlock
  onChange: (changes: Partial<ArticleImageBlock>) => void
}

export const ArticleImageBlockEditor = memo(({ className = '', block, onChange }: Props) => {
  const { t } = useTranslation()

  const onSrcChange = useCallback(
    (value: string) => onChange({ src: value }),
    [onChange],
  )

  const onTitleChange = useCallback(
    (value: string) => onChange({ title: value }),
    [onChange],
  )

  return (
    <div className={classNames(cls.ArticleImageBlockEditor, {}, [className])}>
      <Input
        placeholder={t('Ссылка на изображение')}
        value={block.src}
        onChange={onSrcChange}
      />
      <Input
        placeholder={t('Подпись к изображению')}
        value={block.title}
        onChange={onTitleChange}
      />
    </div>
  )
})

ArticleImageBlockEditor.displayName = 'ArticleImageBlockEditor'
```

```scss
/* src/features/articleForm/ui/ArticleForm/blocks/ArticleImageBlockEditor.module.scss */
.ArticleImageBlockEditor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/features/articleForm/ui/ArticleForm/blocks/ArticleTextBlockEditor* src/features/articleForm/ui/ArticleForm/blocks/ArticleCodeBlockEditor* src/features/articleForm/ui/ArticleForm/blocks/ArticleImageBlockEditor*
git commit -m "feat(articleForm): add block editor components"
```

---

### Task 8: ArticleBlockList + ArticleBlockAdder

**Files:**

- Create: `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.tsx`
- Create: `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.module.scss`
- Create: `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.tsx`
- Create: `src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.module.scss`

- [ ] **Step 1: Create ArticleBlockList**

```typescript
// src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.tsx
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  ArticleBlockType,
  type ArticleBlock,
  type ArticleCodeBlock,
  type ArticleImageBlock,
  type ArticleTextBlock,
} from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'
import {
  articleFormActions,
  selectBlocks,
} from '../../../model/slices/articleFormSlice'
import { ArticleCodeBlockEditor } from './ArticleCodeBlockEditor'
import { ArticleImageBlockEditor } from './ArticleImageBlockEditor'
import { ArticleTextBlockEditor } from './ArticleTextBlockEditor'
import cls from './ArticleBlockList.module.scss'

interface Props {
  className?: string
}

export const ArticleBlockList = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const blocks = useAppSelector(selectBlocks)

  const onRemove = useCallback(
    (id: string) => dispatch(articleFormActions.removeBlock(id)),
    [dispatch],
  )

  const onChange = useCallback(
    (id: string, changes: Partial<ArticleBlock>) =>
      dispatch(articleFormActions.updateBlock({ id, changes })),
    [dispatch],
  )

  return (
    <div className={classNames(cls.ArticleBlockList, {}, [className])}>
      {blocks.map((block) => (
        <div key={block.id} className={cls.block}>
          {block.type === ArticleBlockType.TEXT && (
            <ArticleTextBlockEditor
              block={block as ArticleTextBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          {block.type === ArticleBlockType.CODE && (
            <ArticleCodeBlockEditor
              block={block as ArticleCodeBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          {block.type === ArticleBlockType.IMAGE && (
            <ArticleImageBlockEditor
              block={block as ArticleImageBlock}
              onChange={(changes) => onChange(block.id, changes)}
            />
          )}
          <Button
            theme={buttonTheme.outline}
            onClick={() => onRemove(block.id)}
            className={cls.removeBtn}
          >
            {t('Удалить блок')}
          </Button>
        </div>
      ))}
    </div>
  )
})

ArticleBlockList.displayName = 'ArticleBlockList'
```

```scss
/* src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList.module.scss */
.ArticleBlockList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.removeBtn {
  align-self: flex-end;
}
```

- [ ] **Step 2: Create ArticleBlockAdder**

```typescript
// src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.tsx
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/app/store'
import { ArticleBlockType } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'
import { articleFormActions } from '../../../model/slices/articleFormSlice'
import cls from './ArticleBlockAdder.module.scss'

interface Props {
  className?: string
}

export const ArticleBlockAdder = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onAdd = useCallback(
    (type: ArticleBlockType) => dispatch(articleFormActions.addBlock(type)),
    [dispatch],
  )

  return (
    <div className={classNames(cls.ArticleBlockAdder, {}, [className])}>
      <Button theme={buttonTheme.outline} onClick={() => onAdd(ArticleBlockType.TEXT)}>
        {t('+ Текст')}
      </Button>
      <Button theme={buttonTheme.outline} onClick={() => onAdd(ArticleBlockType.CODE)}>
        {t('+ Код')}
      </Button>
      <Button theme={buttonTheme.outline} onClick={() => onAdd(ArticleBlockType.IMAGE)}>
        {t('+ Изображение')}
      </Button>
    </div>
  )
})

ArticleBlockAdder.displayName = 'ArticleBlockAdder'
```

```scss
/* src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder.module.scss */
.ArticleBlockAdder {
  display: flex;
  gap: 8px;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockList* src/features/articleForm/ui/ArticleForm/blocks/ArticleBlockAdder*
git commit -m "feat(articleForm): add block list and adder components"
```

---

### Task 9: ArticleFormFields

**Files:**

- Create: `src/features/articleForm/ui/ArticleForm/ArticleFormFields.tsx`
- Create: `src/features/articleForm/ui/ArticleForm/ArticleFormFields.module.scss`

- [ ] **Step 1: Create ArticleFormFields**

```typescript
// src/features/articleForm/ui/ArticleForm/ArticleFormFields.tsx
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { ArticleType } from '@/entities/article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui'
import {
  articleFormActions,
  selectFormData,
  selectValidateError,
} from '../../model/slices/articleFormSlice'
import cls from './ArticleFormFields.module.scss'

interface Props {
  className?: string
}

const ARTICLE_TYPES = [
  ArticleType.IT,
  ArticleType.SCIENCE,
  ArticleType.ECONOMICS,
] as const

export const ArticleFormFields = memo(({ className = '' }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const formData = useAppSelector(selectFormData)
  const validateError = useAppSelector(selectValidateError)

  return (
    <div className={classNames(cls.ArticleFormFields, {}, [className])}>
      <div className={cls.field}>
        <Input
          placeholder={t('Заголовок')}
          value={formData.title}
          onChange={(v) => dispatch(articleFormActions.setTitle(v))}
        />
        {validateError && <p className={cls.error}>{validateError}</p>}
      </div>
      <Input
        placeholder={t('Подзаголовок')}
        value={formData.subtitle}
        onChange={(v) => dispatch(articleFormActions.setSubtitle(v))}
      />
      <Input
        placeholder={t('Ссылка на обложку')}
        value={formData.img}
        onChange={(v) => dispatch(articleFormActions.setImg(v))}
      />
      <div className={cls.types}>
        {ARTICLE_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={classNames(cls.typeBtn, {
              [cls.typeBtnActive]: formData.type.includes(type),
            }, [])}
            onClick={() => dispatch(articleFormActions.toggleType(type))}
          >
            {t(type)}
          </button>
        ))}
      </div>
    </div>
  )
})

ArticleFormFields.displayName = 'ArticleFormFields'
```

```scss
/* src/features/articleForm/ui/ArticleForm/ArticleFormFields.module.scss */
.ArticleFormFields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.error {
  color: red;
  font-size: 12px;
  margin: 0;
}

.types {
  display: flex;
  gap: 8px;
}

.typeBtn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.typeBtnActive {
  border-color: #5c56f5;
  background: #5c56f520;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/features/articleForm/ui/ArticleForm/ArticleFormFields*
git commit -m "feat(articleForm): add form fields component"
```

---

### Task 10: ArticleForm root + stories

**Files:**

- Create: `src/features/articleForm/ui/ArticleForm/ArticleForm.tsx`
- Create: `src/features/articleForm/ui/ArticleForm/ArticleForm.module.scss`
- Create: `src/features/articleForm/ui/ArticleForm/ArticleForm.stories.tsx`

- [ ] **Step 1: Create ArticleForm root component**

```typescript
// src/features/articleForm/ui/ArticleForm/ArticleForm.tsx
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { AppRoutes, routesPaths } from '@/shared/config/routes'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, buttonTheme } from '@/shared/ui'
import { fetchArticleForEdit } from '../../model/services/fetchArticleForEdit/fetchArticleForEdit'
import { saveArticle } from '../../model/services/saveArticle/saveArticle'
import {
  articleFormActions,
  selectIsLoading,
} from '../../model/slices/articleFormSlice'
import { ArticleBlockAdder } from './blocks/ArticleBlockAdder'
import { ArticleBlockList } from './blocks/ArticleBlockList'
import { ArticleFormFields } from './ArticleFormFields'
import cls from './ArticleForm.module.scss'

interface ArticleFormProps {
  className?: string
  articleId?: string
}

export const ArticleForm = memo(({ className = '', articleId }: ArticleFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleForEdit(articleId))
    } else {
      dispatch(articleFormActions.resetForm())
    }
  }, [articleId, dispatch])

  const onSave = useCallback(() => {
    dispatch(
      saveArticle({
        id: articleId,
        onSuccess: (savedId) =>
          navigate(
            routesPaths[AppRoutes.ARTICLE_DETAILS].path.replace(':id', savedId),
          ),
      }),
    )
  }, [articleId, dispatch, navigate])

  return (
    <div className={classNames(cls.ArticleForm, {}, [className])}>
      <ArticleFormFields />
      <ArticleBlockList />
      <ArticleBlockAdder />
      <Button theme={buttonTheme.outline} onClick={onSave} disabled={isLoading}>
        {isLoading ? t('Сохранение...') : t('Сохранить')}
      </Button>
    </div>
  )
})

ArticleForm.displayName = 'ArticleForm'
```

```scss
/* src/features/articleForm/ui/ArticleForm/ArticleForm.module.scss */
.ArticleForm {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
}
```

- [ ] **Step 2: Create stories**

```typescript
// src/features/articleForm/ui/ArticleForm/ArticleForm.stories.tsx
import { ArticleForm } from './ArticleForm'
import { ArticleBlockType, ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'features/ArticleForm',
  component: ArticleForm,
} satisfies Meta<typeof ArticleForm>

export default meta
type Story = StoryObj<typeof meta>

const emptyForm = {
  articleForm: {
    formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
    isLoading: false,
  },
}

export const Create: Story = {
  decorators: [StoreDecorator(emptyForm)],
}

export const Edit: Story = {
  args: { articleId: '1' },
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: 'Subtitle here',
          img: 'https://example.com/img.jpg',
          type: [ArticleType.IT],
          blocks: [
            {
              id: '1',
              type: ArticleBlockType.TEXT,
              paragraphs: ['Hello world'],
              title: 'Intro',
            },
            { id: '2', type: ArticleBlockType.CODE, code: 'const x = 1' },
          ],
        },
        isLoading: false,
      },
    }),
  ],
}

export const WithValidationError: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
        validateError: 'Заголовок обязателен',
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: '',
          img: '',
          type: [],
          blocks: [],
        },
        isLoading: true,
      },
    }),
  ],
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/articleForm/ui/ArticleForm/ArticleForm*
git commit -m "feat(articleForm): add root ArticleForm component and stories"
```

---

### Task 11: index.ts

**Files:**

- Create: `src/features/articleForm/index.ts`

- [ ] **Step 1: Create public API**

```typescript
// src/features/articleForm/index.ts
export type { ArticleFormSchema } from './model/types/articleFormSchema'
export { ArticleForm } from './ui/ArticleForm/ArticleForm'
```

- [ ] **Step 2: Commit**

```bash
git add src/features/articleForm/index.ts
git commit -m "feat(articleForm): add public API index"
```

---

### Task 12: Update pages + their stories

**Files:**

- Modify: `src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.tsx`
- Modify: `src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.stories.tsx`
- Modify: `src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.tsx`
- Modify: `src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.stories.tsx`

- [ ] **Step 1: Update ArticleCreatePage**

```typescript
// src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.tsx
import { memo } from 'react'
import { ArticleForm } from '@/features/articleForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page/Page'
import cls from './ArticleCreatePage.module.scss'

interface ArticleCreatePageProps {
  className?: string
}

const ArticleCreatePage = memo(({ className = '' }: ArticleCreatePageProps) => (
  <Page className={classNames(cls.ArticleCreatePage, {}, [className])}>
    <ArticleForm />
  </Page>
))

export default ArticleCreatePage
ArticleCreatePage.displayName = 'ArticleCreatePage Component'
```

- [ ] **Step 2: Update ArticleCreatePage stories**

```typescript
// src/pages/ArticleCreatePage/ui/ArticleCreatePage/ArticleCreatePage.stories.tsx
import ArticleCreatePage from './ArticleCreatePage'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Meta, StoryObj } from '@storybook/react-webpack5'

const meta = {
  title: 'pages/ArticleCreatePage',
  component: ArticleCreatePage,
} satisfies Meta<typeof ArticleCreatePage>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: { title: '', subtitle: '', img: '', type: [], blocks: [] },
        isLoading: false,
      },
    }),
  ],
}
```

- [ ] **Step 3: Update ArticleEditPage**

```typescript
// src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.tsx
import { memo } from 'react'
import { useParams } from 'react-router'
import { ArticleForm } from '@/features/articleForm'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/page/Page'
import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className = '' }: ArticleEditPageProps) => {
  const { id } = useParams<{ id: string }>()
  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      <ArticleForm articleId={id} />
    </Page>
  )
})

export default ArticleEditPage
ArticleEditPage.displayName = 'ArticleEditPage Component'
```

- [ ] **Step 4: Update ArticleEditPage stories**

```typescript
// src/pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage.stories.tsx
import { MemoryRouter, Route, Routes } from 'react-router'
import ArticleEditPage from './ArticleEditPage'
import { ArticleType } from '@/entities/article'
import { StoreDecorator } from '@/shared/lib/sb/decorators/Store'
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5'

const EDIT_ROUTE_PATTERN = '/articles/:id/edit'
const EDIT_ROUTE_ENTRY = '/articles/1/edit'

const meta = {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage,
} satisfies Meta<typeof ArticleEditPage>

export default meta
type Story = StoryObj<typeof meta>

const EditRouteDecorator: Decorator = (Story) => (
  <MemoryRouter initialEntries={[EDIT_ROUTE_ENTRY]}>
    <Routes>
      <Route path={EDIT_ROUTE_PATTERN} element={<Story />} />
    </Routes>
  </MemoryRouter>
)

export const Normal: Story = {
  parameters: { router: 'none' },
  decorators: [
    StoreDecorator({
      articleForm: {
        formData: {
          title: 'My Article',
          subtitle: 'Subtitle',
          img: '',
          type: [ArticleType.IT],
          blocks: [],
        },
        isLoading: false,
      },
    }),
    EditRouteDecorator,
  ],
}
```

- [ ] **Step 5: Run all unit tests**

```bash
yarn test:unit
```

Expected: all existing tests pass, no regressions.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ArticleCreatePage/ src/pages/ArticleEditPage/
git commit -m "feat(pages): wire ArticleCreatePage and ArticleEditPage to articleForm feature"
```
