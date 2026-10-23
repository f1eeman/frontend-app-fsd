import { TextEncoder, TextDecoder } from 'util'
import '@testing-library/jest-dom'

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
})

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder,
})
