import JSDOMEnvironment from 'jest-environment-jsdom'
import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from '@jest/environment'

export default class JsdomWithFetchEnvironment extends JSDOMEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context)

    Object.assign(this.global, {
      fetch,
      Headers,
      Request,
      Response,
      FormData,
      AbortController,
      AbortSignal,
    })
  }
}
