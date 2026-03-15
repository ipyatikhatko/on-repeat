'use client'
import client from '@/lib/api/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { PostCard } from '@/modules/feed/components/post-card'

export default function FeedPage() {

  const feedQuery = useQuery({
    queryKey: ['feed-popular'],
    queryFn: async () => {
      const { data } = await client.GET('/feed/popular', {
        params: {
          query: {
            page: 1,
            limit: 20
          }
        }
      })
      return data || []
    }
  })

  return (
    <>
      <div className="space-y-4">
        {feedQuery.data?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
