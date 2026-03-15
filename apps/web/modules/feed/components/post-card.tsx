'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/common/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { components } from '@onrepeat/types';
import { PostContent } from './post-content';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: components['schemas']['PostResponseDto'];
  fullView?: boolean;
}

export function PostCard(props: PostCardProps) {
  const { post, fullView = false } = props;
  const router = useRouter();

  const handleMediaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // TODO: Open post in a modal with full-sized media and comments at the right
  };

  const onLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: Implement like functionality
  };

  const onCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: Implement comment functionality
  };

  const onShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // TODO: Implement share functionality
  };

  const onPostClick = () => {
    if (!fullView) {
      router.push(`/feed/${post.id}`);
    }
  };

  return (
    <div
      onClick={onPostClick}
      className="p-4 border-b md:border rounded-2xl cursor-pointer"
    >
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author.profile?.avatarUrl} />
            <AvatarFallback>{post.author.username?.[0]}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{post.author.username}</span>
          <span className="text-muted-foreground text-sm">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>

        <PostContent fullView={fullView} content={post.content} />

        {post.mediaUrl && (
          <div
            onClick={handleMediaClick}
            className="group mt-3 border rounded-lg relative overflow-hidden cursor-pointer w-full min-h-[400px] max-h-[400px]"
          >
            <Image
              src={post.mediaUrl}
              alt={post.content}
              className="group-hover:scale-105 object-cover transition-all duration-300 ease-in-out"
              fill
            />
          </div>
        )}

        <div className="flex gap-6 mt-3 text-muted-foreground">
          <button
            onClick={onLikeClick}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Heart className="h-5 w-5" />
            <span>{post._count.likes}</span>
          </button>
          <button
            onClick={onCommentClick}
            className="flex items-center gap-2 hover:text-primary"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{post._count.comments}</span>
          </button>
          <button
            onClick={onShareClick}
            className="flex items-center gap-2 hover:text-primary"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
