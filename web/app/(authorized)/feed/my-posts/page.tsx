'use client';

import { usePostFilters } from '@/modules/feed/hooks/use-post-filters';
import { useMyPosts } from '@/modules/feed/hooks/use-my-posts';
import { PostFiltersComponent } from '@/modules/feed/components/filters/post-filters';
import { PostsList } from '@/modules/feed/components/posts-list';
import { PaginationControls } from '@/modules/feed/components/pagination-controls';
import { EmptyState } from '@/modules/feed/components/empty-state';
import { hasActiveFilters } from '@/modules/feed/utils/filter-utils';

/**
 * My Posts Page
 * Follows Dependency Inversion Principle - depends on abstractions (hooks, components)
 * Follows Single Responsibility Principle - only orchestrates the page layout
 */
export default function MyPostsPage() {
  const { filters, setStatus, setSortBy, setSortOrder, setPage, resetFilters } =
    usePostFilters();
  const { data: posts = [], isLoading } = useMyPosts(filters);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    const hasFilters = hasActiveFilters(filters);
    return (
      <div className="px-4 py-4 space-y-4">
        <PostFiltersComponent
          filters={filters}
          onStatusChange={setStatus}
          onSortByChange={setSortBy}
          onSortOrderChange={setSortOrder}
        />
        {hasFilters && <EmptyState onResetFilters={resetFilters} />}
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PostFiltersComponent
        filters={filters}
        onStatusChange={setStatus}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />
      <PostsList posts={posts} />
      <PaginationControls
        currentPage={filters.page}
        hasMore={posts.length >= filters.limit}
        onPrevious={() => setPage(Math.max(1, filters.page - 1))}
        onNext={() => setPage(filters.page + 1)}
      />
    </div>
  );
}
