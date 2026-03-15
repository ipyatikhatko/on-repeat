'use client';

import { Button } from '@/modules/common/components/ui/button';
import { PostSortBy } from '../../types/post-filters';

interface SortByFilterProps {
  value: PostSortBy;
  onChange: (sortBy: PostSortBy) => void;
}

const SORT_OPTIONS: Array<{ value: PostSortBy; label: string }> = [
  { value: 'createdAt', label: 'Created' },
  { value: 'updatedAt', label: 'Updated' },
  { value: 'viewCount', label: 'Views' },
  { value: 'likeCount', label: 'Likes' },
];

/**
 * Sort by filter component
 * Follows Single Responsibility Principle - only handles sort field selection UI
 */
export function SortByFilter({ value, onChange }: SortByFilterProps) {
  return (
    <div className="flex gap-1 border rounded-md p-1">
      {SORT_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant={value === option.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
