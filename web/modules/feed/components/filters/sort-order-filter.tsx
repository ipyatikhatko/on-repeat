'use client';

import { Button } from '@/modules/common/components/ui/button';
import { SortOrder } from '../../types/post-filters';

interface SortOrderFilterProps {
  value: SortOrder;
  onChange: (order: SortOrder) => void;
}

/**
 * Sort order filter component
 * Follows Single Responsibility Principle - only handles sort order selection UI
 */
export function SortOrderFilter({ value, onChange }: SortOrderFilterProps) {
  return (
    <div className="flex gap-1 border rounded-md p-1">
      <Button
        variant={value === 'desc' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('desc')}
      >
        Desc
      </Button>
      <Button
        variant={value === 'asc' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('asc')}
      >
        Asc
      </Button>
    </div>
  );
}
