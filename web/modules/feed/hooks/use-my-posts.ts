'use client';

import { useQuery } from '@tanstack/react-query';
import client from '@/lib/api/client';
import { PostFilters } from '../types/post-filters';

/**
 * Custom hook for fetching my posts
 * Follows Single Responsibility Principle - only handles data fetching
 */
export function useMyPosts(filters: PostFilters) {
  return useQuery({
    queryKey: ['my-posts', filters.status, filters.sortBy, filters.sortOrder, filters.page],
    queryFn: async () => {
      const { data } = await client.GET('/feed/my-posts', {
        params: {
          query: {
            ...(filters.status && { status: filters.status }),
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
            page: filters.page,
            limit: filters.limit,
          },
        },
      });
      return data || [];
    },
  });
}
