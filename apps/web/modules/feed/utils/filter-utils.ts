import { PostFilters, PostStatus, PostSortBy, SortOrder, DEFAULT_FILTERS } from '../types/post-filters';

/**
 * Parses URL search params into PostFilters
 */
export function parseFiltersFromUrl(searchParams: URLSearchParams): Partial<PostFilters> {
  const filters: Partial<PostFilters> = {};

  const status = searchParams.get('status');
  if (status === 'DRAFT' || status === 'PUBLISHED') {
    filters.status = status as PostStatus;
  }

  const sortBy = searchParams.get('sortBy');
  if (sortBy && ['createdAt', 'updatedAt', 'viewCount', 'likeCount'].includes(sortBy)) {
    filters.sortBy = sortBy as PostSortBy;
  }

  const sortOrder = searchParams.get('sortOrder');
  if (sortOrder === 'asc' || sortOrder === 'desc') {
    filters.sortOrder = sortOrder as SortOrder;
  }

  const page = searchParams.get('page');
  if (page) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      filters.page = pageNum;
    }
  }

  return filters;
}

/**
 * Converts PostFilters to URL search params
 */
export function filtersToSearchParams(filters: Partial<PostFilters>): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set('status', filters.status);
  }

  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set('sortOrder', filters.sortOrder);
  }

  if (filters.page && filters.page > 1) {
    params.set('page', filters.page.toString());
  }

  return params;
}

/**
 * Merges filters with defaults
 */
export function mergeFiltersWithDefaults(
  filters: Partial<PostFilters>,
): PostFilters {
  return {
    ...DEFAULT_FILTERS,
    ...filters,
  };
}

/**
 * Checks if filters have non-default values
 */
export function hasActiveFilters(filters: PostFilters): boolean {
  return (
    filters.status !== undefined ||
    filters.sortBy !== DEFAULT_FILTERS.sortBy ||
    filters.sortOrder !== DEFAULT_FILTERS.sortOrder ||
    filters.page !== DEFAULT_FILTERS.page
  );
}
