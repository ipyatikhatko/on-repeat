'use client';

import { Button } from '@/modules/common/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  hasMore: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Pagination controls component
 * Follows Single Responsibility Principle - only handles pagination UI
 */
export function PaginationControls({
  currentPage,
  hasMore,
  onPrevious,
  onNext,
}: PaginationControlsProps) {
  if (!hasMore && currentPage === 1) {
    return null;
  }

  return (
    <div className="flex justify-center gap-2">
      <Button variant="outline" onClick={onPrevious} disabled={currentPage === 1}>
        Previous
      </Button>
      <Button variant="outline" onClick={onNext} disabled={!hasMore}>
        Next
      </Button>
    </div>
  );
}
