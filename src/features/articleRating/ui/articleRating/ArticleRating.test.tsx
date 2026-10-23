import ArticleRating from './ArticleRating'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'

describe('ArticleRating.test', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should render nothing and skip request for guest', () => {
    const fetchSpy = jest.spyOn(global, 'fetch')

    const { container } = componentRender(<ArticleRating articleId='1' />)

    expect(container).toBeEmptyDOMElement()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
