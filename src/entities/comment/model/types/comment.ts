import type { User } from '@/entities/user'

export interface Comment {
  id: string
  user: User
  text: string
}
