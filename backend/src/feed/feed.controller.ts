import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PostResponseDto } from './dto/post-response.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { MyPostsQueryDto } from './dto/my-posts-query.dto';

@ApiTags('Feed')
@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post('posts')
  @ApiOperation({ summary: 'Create a new post' })
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.feedService.createPost(req.user.sub, createPostDto);
  }

  @Get('posts/:post_id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a post',
    type: PostResponseDto,
  })
  async getPost(@Param('post_id') post_id: string) {
    return this.feedService.getPost(post_id);
  }

  @Get('personal')
  @ApiOperation({ summary: 'Get personal feed (own posts and following)' })
  @ApiResponse({
    status: 200,
    description: 'Returns personal feed posts',
    type: [PostResponseDto],
  })
  async getPersonalFeed(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.feedService.getPersonalFeed(req.user.sub, page, limit);
  }

  @Get('my-posts')
  @ApiOperation({ summary: 'Get my posts with filtering and sorting' })
  @ApiResponse({
    status: 200,
    description: 'Returns user posts with filters applied',
    type: [PostResponseDto],
  })
  async getMyPosts(@Request() req, @Query() query: MyPostsQueryDto) {
    return this.feedService.getMyPosts(req.user.sub, query);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular posts' })
  @ApiResponse({
    status: 200,
    description: 'Returns popular posts',
    type: [PostResponseDto],
  })
  async getPopularFeed(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.feedService.getPopularFeed(page, limit);
  }

  @Get('posts/:post_id/comments')
  @ApiOperation({ summary: 'Get comments for a post' })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: Number,
    description: 'Cursor for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of comments to return',
    example: 20,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns post comments',
    type: [CommentResponseDto],
  })
  async getPostComments(
    @Param('post_id') postId: string,
    @Query('cursor') cursor?: number,
    @Query('take') take: number = 20,
  ) {
    return this.feedService.getPostComments(postId, cursor, take);
  }

  @Get('comments/:comment_id/replies')
  @ApiOperation({ summary: 'Get replies for a comment' })
  @ApiResponse({
    status: 200,
    description: 'Returns comment replies',
  })
  async getCommentReplies(
    @Param('comment_id') commentId: string,
    @Query('cursor') cursor?: number,
    @Query('take') take: number = 20,
  ) {
    return this.feedService.getCommentReplies(commentId, cursor, take);
  }
}
