import { firstCharUpperCase } from '../firstCharUpperCase.mjs'

/**
 * Схема состояния стора. Суффикс Schema отделяет её от доменных типов слайса,
 * которые живут в model/types/<sliceName>.ts (см. entities/article, где есть
 * и article.ts, и articleDetailsSchema.ts).
 *
 * isLoading/error — самая частая форма схемы в проекте; поля заменяются на
 * реальные, шаблон нужен лишь чтобы каркас сразу компилировался.
 */
export const schemaTemplate = (sliceName) =>
  `export interface ${firstCharUpperCase(sliceName)}Schema {
  isLoading: boolean
  error?: string
}
`
