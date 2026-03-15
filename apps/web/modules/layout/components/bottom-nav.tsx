'use client';
import { Button } from '@/modules/common/components/ui/button';
import { HomeIcon, SearchIcon } from 'lucide-react';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-background">
      <div className="flex items-center h-14 px-4 max-w-2xl mx-auto">
        <Button variant="ghost">
          <HomeIcon className="w-4 h-4" />
        </Button>
        <Button variant="ghost">
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}
