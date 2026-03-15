'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
  PostFilters,
  PostStatus,
  PostSortBy,
  SortOrder,
  DEFAULT_FILTERS,
} from '../types/post-filters';
import {
  parseFiltersFromUrl,
  filtersToSearchParams,
  mergeFiltersWithDefaults,
} from '../utils/filter-utils';

/**
 * Custom hook for managing post filters with URL synchronization
 * Follows Single Responsibility Principle - only handles filter state
 */
export function usePostFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const filters = useMemo<PostFilters>(() => {
    const urlFilters = parseFiltersFromUrl(searchParams);
    return mergeFiltersWithDefaults(urlFilters);
  }, [searchParams]);

  // Update URL with new filters
  const updateFilters = useCallback(
    (newFilters: Partial<PostFilters>) => {
      const merged = { ...filters, ...newFilters };
      const params = filtersToSearchParams(merged);
      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(url, { scroll: false });
    },
    [filters, router, pathname],
  );

  // Update specific filter
  const setStatus = useCallback(
    (status: PostStatus | undefined) => {
      updateFilters({ status, page: 1 });
    },
    [updateFilters],
  );

  const setSortBy = useCallback(
    (sortBy: PostSortBy) => {
      updateFilters({ sortBy, page: 1 });
    },
    [updateFilters],
  );

  const setSortOrder = useCallback(
    (sortOrder: SortOrder) => {
      updateFilters({ sortOrder, page: 1 });
    },
    [updateFilters],
  );

  const setPage = useCallback(
    (page: number) => {
      updateFilters({ page });
    },
    [updateFilters],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters,
    setStatus,
    setSortBy,
    setSortOrder,
    setPage,
    resetFilters,
    updateFilters,
  };
}
