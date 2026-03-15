'use client';
import { Button } from '@/modules/common/components/ui/button';
import { CreatePostModal } from '@/modules/feed/components/create-post-modal';
import { AuthorizedHeader } from '@/modules/layout/components/authorized-header';
import { BottomNav } from '@/modules/layout/components/bottom-nav';
import { PenSquare } from 'lucide-react';
import { useState } from 'react';

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  return (
    <div className="relative min-h-screen max-w-2xl mx-auto bg-background">
      <AuthorizedHeader />
      <main className="flex-1 min-h-0 pb-14">{children}</main>
      <BottomNav />
      <div className="fixed bottom-20 right-6">
        <Button
          size="icon"
          className="h-14 min-w-14 w-fit shadow-lg lg:px-4 rounded-full"
          onClick={() => setCreatePostOpen(true)}
        >
          <PenSquare className="size-10 text-red lg:size-10" />
        </Button>
      </div>

      <CreatePostModal open={createPostOpen} onOpenChange={setCreatePostOpen} />
    </div>
  );
}
