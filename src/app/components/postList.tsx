import UserCard from "./UserCard"
import { type Post } from '@/app/types/posts'

export default function PostList({ posts }: { posts: Post[] | null }) {
  return (
    <>
      {posts?.map(post => {
        const {
          id,
          users,
          content,
        } = post;

        if (users) {
          const {
            user_name: userName,
            name,
            avatar_url: avatarUrl,
          } = users;

          return (
            <UserCard key={id} {...{ name, userName, avatarUrl, content }} />
          );
        }

        return null; // O manejar el caso donde users es null
      })}
    </>
  );
}
