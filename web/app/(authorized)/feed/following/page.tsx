'use client';
import client from '@/lib/api/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PostCard } from '@/modules/feed/components/post-card';

export default function FeedFollowingPage() {
  const feedQuery = useQuery({
    queryKey: ['feed-following'],
    queryFn: async () => {
      const { data } = await client.GET('/feed/personal', {
        params: {
          query: {
            page: 1,
            limit: 20,
          },
        },
      });
      return data || [];
    },
  });

  if (feedQuery.data?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No posts found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {feedQuery.data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
