'use client';
import { Button } from '@/modules/common/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './styles.module.css';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFollowing = pathname === '/feed/following';
  const isMyPosts = pathname === '/feed/my-posts';
  const isForYou = pathname === '/feed';

  return (
    <div className="relative min-h-screen max-w-2xl mx-auto bg-background">
      <header className={cn(styles.header, 'sticky top-0 z-10 bg-background')}>
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-xl font-semibold">Feed</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant={isForYou ? 'default' : 'ghost'} asChild>
              <Link href="/feed">For you</Link>
            </Button>
            <Button
              size="sm"
              variant={isFollowing ? 'default' : 'ghost'}
              asChild
            >
              <Link href="/feed/following">Following</Link>
            </Button>
            <Button size="sm" variant={isMyPosts ? 'default' : 'ghost'} asChild>
              <Link href="/feed/my-posts">My Posts</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="pb-20 pt-4">{children}</main>
    </div>
  );
}
