'use client';

import { PostCard } from './post-card';
import { components } from '@onrepeat/types';

interface PostsListProps {
  posts: components['schemas']['PostResponseDto'][];
}

/**
 * Posts list component
 * Follows Single Responsibility Principle - only handles post list rendering
 */
export function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
