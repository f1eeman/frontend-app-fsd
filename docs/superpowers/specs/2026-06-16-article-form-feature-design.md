# Article Form Feature — Design Spec

**Date:** 2026-06-16
**Status:** Approved

## Summary

A single `articleForm` feature that handles both article creation and editing. Manages full form state in Redux (Variant A: flat slice, array-based blocks), saves via thunk, validates `title` before submission.

---

## File Structure (FSD)

```
src/features/articleForm/
├── index.ts
├── model/
│   ├── slices/
│   │   └── articleFormSlice.ts
│   ├── services/
│   │   ├── saveArticle/
│   │   │   └── saveArticle.ts
│   │   └── fetchArticleForEdit/
│   │       └── fetchArticleForEdit.ts
│   ├── selectors/
│   │   └── articleFormSelectors.ts
│   └── types/
│       └── articleFormSchema.ts
└── ui/
    └── ArticleForm/
        ├── ArticleForm.tsx
        ├── ArticleForm.module.scss
        ├── ArticleForm.stories.tsx
        ├── ArticleFormFields.tsx
        └── blocks/
            ├── ArticleBlockList.tsx
            ├── ArticleBlockAdder.tsx
            ├── ArticleTextBlockEditor.tsx
            ├── ArticleCodeBlockEditor.tsx
            └── ArticleImageBlockEditor.tsx
```

---

## Model

### `ArticleFormSchema`

```typescript
interface ArticleFormSchema {
  formData: {
    title: string
    subtitle: string
    img: string
    type: ArticleType[]
    blocks: ArticleBlock[]
  }
  isLoading: boolean
  error?: string
  validateError?: string // title only
}
```

### Slice Actions

| Action        | Payload                                          | Description                           |
| ------------- | ------------------------------------------------ | ------------------------------------- |
| `setTitle`    | `string`                                         | Update title                          |
| `setSubtitle` | `string`                                         | Update subtitle                       |
| `setImg`      | `string`                                         | Update cover image URL                |
| `toggleType`  | `ArticleType`                                    | Add type if absent, remove if present |
| `addBlock`    | `ArticleBlockType`                               | Append new block with generated uuid  |
| `removeBlock` | `id: string`                                     | Remove block by id                    |
| `updateBlock` | `{ id: string, changes: Partial<ArticleBlock> }` | Patch a block                         |
| `initForm`    | `Article`                                        | Populate form for edit mode           |
| `resetForm`   | —                                                | Clear form for create mode            |

### Services

- **`fetchArticleForEdit(id)`** — GET `/articles/:id`, dispatches `initForm(article)` on success
- **`saveArticle({ id? })`** — runs `validateArticleForm` first; if valid: PUT `/articles/:id` (edit) or POST `/articles` (create); navigates to article page on success

### Validation

Synchronous function `validateArticleForm(formData)`:

- Returns error string if `title` is empty
- Returns `undefined` if valid
- Called inside `saveArticle` before the request

---

## UI Components

### `ArticleForm` (root)

- Props: `articleId?: string`
- On mount: if `articleId` → `fetchArticleForEdit(articleId)`, else `resetForm`
- On submit: `saveArticle({ id: articleId })`
- Renders: `ArticleFormFields` + `ArticleBlockList` + `ArticleBlockAdder` + Save button

### `ArticleFormFields`

- `Input` for `title` (shows `validateError` if present)
- `Input` for `subtitle`
- `Input` for `img`
- Type selector using existing `ArticleTypeTabs` from `entities/article`

### `ArticleBlockList`

- Iterates `blocks`, renders the matching editor per `block.type`
- Delete button per block → `removeBlock(id)`

### Block Editors

Each accepts `block` + `onChange(changes: Partial<ArticleBlock>)`:

- **`ArticleTextBlockEditor`** — `Input` for optional title + textarea per paragraph + add/remove paragraph buttons
- **`ArticleCodeBlockEditor`** — `Textarea` for `code`
- **`ArticleImageBlockEditor`** — `Input` for `src` + `Input` for `title`

### `ArticleBlockAdder`

Three buttons: «+ Текст», «+ Код», «+ Изображение» → `addBlock(type)`

---

## Data Flow

### Create

```
mount ArticleForm()
  → dispatch resetForm()
  → user fills fields / adds blocks
  → click «Сохранить»
  → validateArticleForm()
  → dispatch saveArticle({})
  → POST /articles
  → navigate('/articles/:newId/')
```

### Edit

```
mount ArticleForm(articleId="1")
  → dispatch fetchArticleForEdit("1")
  → GET /articles/1
  → dispatch initForm(article)
  → user edits fields / blocks
  → click «Сохранить»
  → validateArticleForm()
  → dispatch saveArticle({ id: "1" })
  → PUT /articles/1
  → navigate('/articles/1/')
```

---

## Pages (after implementation)

```tsx
// ArticleCreatePage
const ArticleCreatePage = () => (
  <Page>
    <ArticleForm />
  </Page>
)

// ArticleEditPage
const ArticleEditPage = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <Page>
      <ArticleForm articleId={id} />
    </Page>
  )
}
```

---

## Testing

### Unit — `articleFormSlice.test.ts`

- `addBlock` generates block of correct type with unique id
- `removeBlock` removes only the target block
- `updateBlock` patches only the target block
- `toggleType` adds type if absent, removes if present
- `initForm` populates all fields correctly

### Unit — `validateArticleForm.test.ts`

- Empty `title` → returns error string
- Non-empty `title` → returns `undefined`

### Storybook — `ArticleForm.stories.tsx`

- `Create` — empty form (no `articleId`)
- `Edit` — prepopulated via `StoreDecorator` with `articleForm` state
- `WithValidationError` — `validateError` set, title highlighted
- `Loading` — `isLoading: true`
