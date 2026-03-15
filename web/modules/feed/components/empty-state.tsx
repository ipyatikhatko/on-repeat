'use client';

import { Button } from '@/modules/common/components/ui/button';

interface EmptyStateProps {
  onResetFilters: () => void;
}

/**
 * Empty state component for when no posts are found
 * Follows Single Responsibility Principle - only handles empty state UI
 */
export function EmptyState({ onResetFilters }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
      <p className="text-sm text-muted-foreground">No posts found</p>
      <Button variant="outline" size="sm" onClick={onResetFilters}>
        Clear filters
      </Button>
    </div>
  );
}
