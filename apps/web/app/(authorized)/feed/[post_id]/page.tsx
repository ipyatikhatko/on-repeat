import PostCommentItem from '@/modules/common/components/post-comment-item';
import { PostCard } from '@/modules/feed/components/post-card';
import { getPost } from '@/modules/feed/ssr/getPost';

export default async function PostPage({
  params,
}: {
  params: Promise<{ post_id: string }>;
}) {
  const { post_id } = await params;
  const data = await getPost(post_id);

  if (!data.post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <PostCard fullView post={data.post} />
      <section className="mt-8 px-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="mt-4 space-y-4">
          {data.comments?.map((comment) => (
            <PostCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </section>
    </>
  );
}
