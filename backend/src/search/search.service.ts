import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchPostsByTags(tags: string[], page = 1, limit = 20) {
    return this.prisma.post.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
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
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async searchPostsByText(searchText: string, page = 1, limit = 20) {
    // Limit search text to 100 characters and split into words
    const searchWords = searchText
      .slice(0, 100)
      .split(/\s+/)
      .filter((word) => word.length > 2);

    return this.prisma.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
          {
            tags: {
              hasSome: searchWords,
            },
          },
        ],
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
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async searchUsers(username: string, page = 1, limit = 20) {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            avatarUrl: true,
            bio: true,
          },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
      orderBy: [{ followers: { _count: 'desc' } }],
      skip: (page - 1) * Number(limit),
      take: Number(limit),
    });
  }
}
