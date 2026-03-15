import { IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PostStatus } from './create-post.dto';

export enum PostSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  VIEW_COUNT = 'viewCount',
  LIKE_COUNT = 'likeCount',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class MyPostsQueryDto {
  @ApiProperty({
    enum: PostStatus,
    required: false,
    description: 'Filter by post status',
  })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @ApiProperty({
    enum: PostSortBy,
    required: false,
    default: PostSortBy.CREATED_AT,
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsEnum(PostSortBy)
  sortBy?: PostSortBy;

  @ApiProperty({
    enum: SortOrder,
    required: false,
    default: SortOrder.DESC,
    description: 'Sort order',
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiProperty({
    required: false,
    default: 1,
    minimum: 1,
    description: 'Page number',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    required: false,
    default: 20,
    minimum: 1,
    maximum: 100,
    description: 'Number of posts per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}
