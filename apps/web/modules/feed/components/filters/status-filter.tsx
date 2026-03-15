'use client';

import { Button } from '@/modules/common/components/ui/button';
import { PostStatus } from '../../types/post-filters';

interface StatusFilterProps {
  value?: PostStatus;
  onChange: (status: PostStatus | undefined) => void;
}

/**
 * Status filter component
 * Follows Single Responsibility Principle - only handles status filtering UI
 */
export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex gap-1 border rounded-full p-1">
      <Button
        variant={value === undefined ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange(undefined)}
      >
        All
      </Button>
      <Button
        variant={value === 'PUBLISHED' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('PUBLISHED')}
      >
        Published
      </Button>
      <Button
        variant={value === 'DRAFT' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('DRAFT')}
      >
        Drafts
      </Button>
    </div>
  );
}
