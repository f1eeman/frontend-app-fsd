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

  test('addBlock creates TEXT block with empty paragraphs array', () => {
    const result = articleFormReducer(
      emptyState,
      articleFormActions.addBlock(ArticleBlockType.TEXT),
    )
    const block = result.formData.blocks[0]
    expect(block.type).toBe(ArticleBlockType.TEXT)
    if (block.type !== ArticleBlockType.TEXT) throw new Error('expected TEXT')
    expect(block.paragraphs).toEqual([])
  })

  test('addBlock creates IMAGE block with empty src and title', () => {
    const result = articleFormReducer(
      emptyState,
      articleFormActions.addBlock(ArticleBlockType.IMAGE),
    )
    const block = result.formData.blocks[0]
    expect(block.type).toBe(ArticleBlockType.IMAGE)
    if (block.type !== ArticleBlockType.IMAGE) throw new Error('expected IMAGE')
    expect(block.src).toBe('')
    expect(block.title).toBe('')
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
