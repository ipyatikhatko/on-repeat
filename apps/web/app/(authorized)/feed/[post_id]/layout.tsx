'use client';

import { Button } from '@/modules/common/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleBack = () => {
    // Always navigate to /feed to avoid unexpected redirects
    router.push('/feed');
  };

  return (
    <div className="relative min-h-screen max-w-2xl mx-auto bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background">
        <div className="flex items-center gap-4 h-14 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Post</h1>
        </div>
      </header>
      <main className="pb-20 pt-4">{children}</main>
    </div>
  );
}
