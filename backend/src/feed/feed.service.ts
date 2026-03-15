import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, PostStatus } from './dto/create-post.dto';
import {
  MyPostsQueryDto,
  PostSortBy,
  SortOrder,
} from './dto/my-posts-query.dto';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async createPost(authorId: number, data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        content: data.content,
        authorId,
        mediaUrl: data.mediaUrl,
        tags: data.tags || [],
        status: data.status || PostStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  async getPost(postId: string) {
    try {
      return this.prisma.post.findUnique({
        where: { id: Number(postId) },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              profile: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });
    } catch {
      throw new NotFoundException('Post not found');
    }
  }

  async getPersonalFeed(userId: number, page = 1, limit = 20) {
    // Ensure page and limit are numbers (query params come as strings)
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;

    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);

    return this.prisma.post.findMany({
      where: {
        // Only posts from followed users (exclude user's own posts)
        authorId: { in: followingIds },
        status: PostStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });
  }

  async getPopularFeed(page = 1, limit = 20) {
    // Ensure page and limit are numbers (query params come as strings)
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;

    return this.prisma.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: [
        { likes: { _count: 'desc' } },
        { comments: { _count: 'desc' } },
        { createdAt: 'desc' },
      ],
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });
  }

  async getPostComments(postId: string, cursor?: number, take: number = 20) {
    return this.prisma.comment.findMany({
      where: {
        postId: Number(postId),
        parentId: null,
      },
      take: Number(take),
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: Number(cursor) } }),
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
            profile: { select: { avatarUrl: true } },
          },
        },
        _count: {
          select: {
            likes: true,
            replies: true,
          },
        },
      },
    });
  }

  async getCommentReplies(
    commentId: string,
    cursor?: number,
    take: number = 20,
  ) {
    return this.prisma.comment.findMany({
      where: { parentId: Number(commentId) },
      take: Number(take),
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: Number(cursor) } }),
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile: { select: { avatarUrl: true } },
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }

  async getMyPosts(userId: number, query: MyPostsQueryDto) {
    const {
      status,
      sortBy = PostSortBy.CREATED_AT,
      sortOrder = SortOrder.DESC,
      page = 1,
      limit = 20,
    } = query;

    // Ensure page and limit are numbers (query params come as strings)
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 20;

    // Build where clause
    const where: any = {
      authorId: userId,
    };

    if (status) {
      where.status = status;
    }

    // Build orderBy clause
    let orderBy: any = {};
    if (sortBy === PostSortBy.LIKE_COUNT) {
      orderBy = {
        likes: {
          _count: sortOrder,
        },
      };
    } else if (sortBy === PostSortBy.VIEW_COUNT) {
      orderBy = {
        viewCount: sortOrder,
      };
    } else {
      orderBy = {
        [sortBy]: sortOrder,
      };
    }

    return this.prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });
  }
}
