'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface PostContentProps {
  content: string;
  fullView?: boolean;
}

export function PostContent({ content, fullView = false }: PostContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(fullView);

  useEffect(() => {
    if (contentRef.current) {
      setHasOverflow(contentRef.current.scrollHeight > 100);
    }
  }, [content]);

  return (
    <div className="relative">
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded || !hasOverflow ? 'grid-rows-[1fr]' : `grid-rows-[100px]`,
        )}
        style={{
          transitionProperty: 'grid-template-rows, opacity, height',
          willChange: 'grid-template-rows, opacity, height',
        }}
      >
        <div ref={contentRef} className="relative overflow-hidden">
          <p className="z-0 whitespace-pre-wrap">{content}</p>
          {!isExpanded && hasOverflow && (
            <div className="absolute z-10 bottom-0 left-0 right-0 rounded-b-lg h-full bg-gradient-to-t from-background to-transparent" />
          )}
        </div>
      </div>

      {hasOverflow && !fullView && (
        <div className="flex items-center gap-2 justify-end mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <span>{isExpanded ? 'Show less' : 'Show more'}</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isExpanded && 'rotate-180',
              )}
            />
          </button>
        </div>
      )}
    </div>
  );
}
