export type PostStatus = 'DRAFT' | 'PUBLISHED';

export type PostSortBy = 'createdAt' | 'updatedAt' | 'viewCount' | 'likeCount';

export type SortOrder = 'asc' | 'desc';

export interface PostFilters {
  status?: PostStatus;
  sortBy: PostSortBy;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

export const DEFAULT_FILTERS: PostFilters = {
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 20,
};
