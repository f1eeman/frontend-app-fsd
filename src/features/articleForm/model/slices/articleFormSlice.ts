import {
  createSlice,
  type PayloadAction,
  type WithSlice,
} from '@reduxjs/toolkit'
import { fetchArticleForEdit } from '../services/fetchArticleForEdit/fetchArticleForEdit'
import { saveArticle } from '../services/saveArticle/saveArticle'
import { rootReducer } from '@/app/store'
import {
  ArticleBlockType,
  type Article,
  type ArticleBlock,
  type ArticleCodeBlock,
  type ArticleImageBlock,
  type ArticleTextBlock,
  type ArticleType,
} from '@/entities/article'
import type { ArticleFormSchema } from '../types/articleFormSchema'

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never

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
      action: PayloadAction<{
        id: string
        changes: DistributiveOmit<Partial<ArticleBlock>, 'type'>
      }>,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleForEdit.pending, (state) => {
        state.isLoading = true
        state.error = undefined
      })
      .addCase(
        fetchArticleForEdit.fulfilled,
        (state, action: PayloadAction<Article>) => {
          const { title, subtitle, img, type, blocks } = action.payload
          state.formData = { title, subtitle, img, type, blocks }
          state.isLoading = false
          state.validateError = undefined
          state.error = undefined
        },
      )
      .addCase(fetchArticleForEdit.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(saveArticle.pending, (state) => {
        state.isLoading = true
        state.error = undefined
        state.validateError = undefined
      })
      .addCase(saveArticle.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(saveArticle.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload
        if (payload?.startsWith('VALIDATION:')) {
          state.validateError = payload.replace('VALIDATION:', '')
          state.error = undefined
        } else {
          state.error = payload
          state.validateError = undefined
        }
      })
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
