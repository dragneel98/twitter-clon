import { type Database } from '../types/database'

type PostEntity = Database['public']['Tables']['post']['Row']
type UserEntity = Database['public']['Tables']['users']['Row']

export type Post = PostEntity & {
  users: UserEntity | null
}