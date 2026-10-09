import { firstCharUpperCase } from '../firstCharUpperCase.mjs'

export const schemaTemplate = (sliceName) =>
  `export interface ${firstCharUpperCase(sliceName)}Schema {
  isLoading: boolean
  error?: string
}
`
