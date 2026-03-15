'use client';

import { StatusFilter } from './status-filter';
import { PostsSorter } from './posts-sorter';
import { PostFilters } from '../../types/post-filters';

interface PostFiltersProps {
  filters: PostFilters;
  onStatusChange: (status: PostFilters['status']) => void;
  onSortByChange: (sortBy: PostFilters['sortBy']) => void;
  onSortOrderChange: (order: PostFilters['sortOrder']) => void;
}

/**
 * Composite filter component that combines all filter controls
 * Follows Open/Closed Principle - can be extended without modification
 */
export function PostFiltersComponent({
  filters,
  onStatusChange,
  onSortByChange,
  onSortOrderChange,
}: PostFiltersProps) {
  return (
    <div className="flex flex-wrap justify-between gap-2 items-center">
      <StatusFilter value={filters.status} onChange={onStatusChange} />
      <PostsSorter
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSortByChange={onSortByChange}
        onSortOrderChange={onSortOrderChange}
      />
    </div>
  );
}
