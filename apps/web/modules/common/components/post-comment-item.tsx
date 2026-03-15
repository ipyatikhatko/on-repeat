import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import React from 'react';
import { components } from '@onrepeat/types';

export default function PostCommentItem({
  comment,
}: {
  comment: components['schemas']['CommentResponseDto'];
}) {
  return (
    <div>
      <Avatar>
        <AvatarImage src={comment.user.profile?.avatarUrl} />
        <AvatarFallback>{comment.user.username?.[0]}</AvatarFallback>
      </Avatar>
      <span className="font-semibold">{comment.user.username}</span>
      <p className="text-sm font-normal">{comment.content}</p>
      <span className="text-muted-foreground text-sm float-end">
        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
      </span>
    </div>
  );
}
