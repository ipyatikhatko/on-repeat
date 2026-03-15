'use server';

import client from '@/lib/api/client';
import { getAuthHeaders } from '@/lib/api/server-client';
import { components } from '@/lib/api/v1';

export async function getPost(postId: string) {
  const post_id = await postId;
  const authHeaders = await getAuthHeaders();

  const post = await client.GET('/feed/posts/{post_id}', {
    params: {
      path: {
        post_id,
      },
    },
    headers: authHeaders,
  });

  const comments = await client.GET('/feed/posts/{post_id}/comments', {
    params: {
      path: {
        post_id,
      },
      query: {
        take: 20,
      },
    },
    headers: authHeaders,
  });

  const commentData: components['schemas']['CommentResponseDto'][] =
    comments.data || [];

  return {
    post: post.data,
    comments: commentData,
  };
}
