import JSDOMEnvironment from 'jest-environment-jsdom'
import type {
  EnvironmentContext,
  JestEnvironmentConfig,
} from '@jest/environment'

/**
 * jsdom не реализует Fetch API, из-за чего RTK Query при импорте store пишет
 * предупреждение про SSR-окружение, а тесты, дошедшие до реального запроса,
 * падали бы на отсутствующем fetch. Пробрасываем реализацию из Node.
 */
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
