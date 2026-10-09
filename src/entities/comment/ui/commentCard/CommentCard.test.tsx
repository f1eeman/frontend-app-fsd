import { screen } from '@testing-library/react'
import { CommentCard } from './CommentCard'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import type { Comment } from '../../model/types/comment'

const comment: Comment = {
  id: '1',
  text: 'hello world',
  user: { id: '2', username: 'Vasya', role: 'USER' },
}

describe('CommentCard.test', () => {
  test('should link to author profile', () => {
    componentRender(<CommentCard comment={comment} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', '/profile/2')
  })

  test('should render nothing without comment', () => {
    componentRender(<CommentCard />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
