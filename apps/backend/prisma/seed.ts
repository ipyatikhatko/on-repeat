import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const USERS_COUNT = 20;
const POSTS_COUNT = 150;
const MAX_LIKES_PER_POST = 15;
const MAX_COMMENTS_PER_POST = 8;
const MAX_FOLLOWS_PER_USER = 10;

// Create an array of common tags for more realistic data
const COMMON_TAGS = [
  'music',
  'art',
  'photography',
  'travel',
  'food',
  'technology',
  'sports',
  'fashion',
  'nature',
  'gaming',
];

async function main() {
  // Clear existing data (handle cases where tables don't exist yet)
  try {
    await prisma.like.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.comment.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.follow.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.post.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.profile.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.oAuthAccount.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }
  try {
    await prisma.user.deleteMany();
  } catch (error) {
    // Table doesn't exist yet, skip
  }

  // Create users
  const users = [];
  for (let i = 0; i < USERS_COUNT; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: await bcrypt.hash('password123', 10),
        username: faker.internet.username().toLowerCase(),
        isVerified: true,
        profile: {
          create: {
            bio: faker.person.bio(),
            avatarUrl: faker.image.avatar(),
            location: faker.location.city(),
            website: faker.internet.url(),
          },
        },
      },
    });
    users.push(user);
  }

  // Create posts with more realistic data
  const posts = [];
  for (let i = 0; i < POSTS_COUNT; i++) {
    const randomTags = [...COMMON_TAGS]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const post = await prisma.post.create({
      data: {
        content: faker.helpers
          .multiple(faker.lorem.paragraph, {
            count: { min: 1, max: 3 },
          })
          .join('\n\n'),
        authorId: users[Math.floor(Math.random() * users.length)].id,
        tags: randomTags,
        mediaUrl: Math.random() > 0.7 ? faker.image.url() : null,
        viewCount: faker.number.int({ min: 50, max: 10000 }),
        shareCount: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past({ years: 1 }),
      },
    });
    posts.push(post);
  }

  // Create likes with better distribution
  for (const post of posts) {
    const likesCount = Math.floor(Math.random() * MAX_LIKES_PER_POST);
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random());

    for (let i = 0; i < likesCount; i++) {
      try {
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: shuffledUsers[i].id,
            createdAt: faker.date.between({
              from: post.createdAt,
              to: new Date(),
            }),
          },
        });
      } catch {
        continue;
      }
    }
  }

  // Create comments with better timing and likes
  for (const post of posts) {
    const commentsCount = Math.floor(Math.random() * MAX_COMMENTS_PER_POST);

    for (let i = 0; i < commentsCount; i++) {
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.paragraph(),
          postId: post.id,
          userId: users[Math.floor(Math.random() * users.length)].id,
          createdAt: faker.date.between({
            from: post.createdAt,
            to: new Date(),
          }),
        },
      });

      // Add likes to comments
      const commentLikesCount = Math.floor(Math.random() * MAX_LIKES_PER_POST);
      const shuffledUsers = [...users].sort(() => 0.5 - Math.random());

      for (let j = 0; j < commentLikesCount; j++) {
        try {
          await prisma.like.create({
            data: {
              commentId: comment.id,
              userId: shuffledUsers[j].id,
              createdAt: faker.date.between({
                from: comment.createdAt,
                to: new Date(),
              }),
            },
          });
        } catch {
          continue;
        }
      }
    }
  }

  // Create follows with better distribution
  for (const user of users) {
    const followsCount = Math.floor(Math.random() * MAX_FOLLOWS_PER_USER);
    const shuffledUsers = users
      .filter((u) => u.id !== user.id)
      .sort(() => 0.5 - Math.random());

    for (let i = 0; i < followsCount; i++) {
      try {
        await prisma.follow.create({
          data: {
            followerId: user.id,
            followingId: shuffledUsers[i].id,
            createdAt: faker.date.past({ years: 1 }),
          },
        });
      } catch {
        continue;
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
