'use client';

import { Button } from '@/modules/common/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/common/components/ui/select';
import { PostSortBy, SortOrder } from '../../types/post-filters';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface PostsSorterProps {
  sortBy: PostSortBy;
  sortOrder: SortOrder;
  onSortByChange: (sortBy: PostSortBy) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

const SORT_OPTIONS: Array<{ value: PostSortBy; label: string }> = [
  { value: 'createdAt', label: 'Created' },
  { value: 'updatedAt', label: 'Updated' },
  { value: 'viewCount', label: 'Views' },
  { value: 'likeCount', label: 'Likes' },
];

/**
 * Combined posts sorter component
 * Combines sort field selection (Select) and sort order toggle (buttons)
 * Follows Single Responsibility Principle - handles all sorting UI
 */
export function PostsSorter({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
}: PostsSorterProps) {
  const currentSortLabel = SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || 'Created';

  return (
    <div className="flex items-center gap-0 border border-input rounded-full overflow-hidden bg-background">
      <Select value={sortBy} onValueChange={(value) => onSortByChange(value as PostSortBy)}>
        <SelectTrigger className="h-9 rounded-l-full rounded-r-none border-0 border-r border-input focus:ring-0 focus:ring-offset-0 shadow-none">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <SelectValue>{currentSortLabel}</SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex">
        <Button
          variant={sortOrder === 'desc' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onSortOrderChange('desc')}
          className="h-9 rounded-none border-0 border-r border-input shadow-none"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
        <Button
          variant={sortOrder === 'asc' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onSortOrderChange('asc')}
          className="h-9 rounded-r-full rounded-l-none border-0 shadow-none"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
