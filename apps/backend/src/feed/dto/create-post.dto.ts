import {
  IsString,
  IsOptional,
  MaxLength,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  content: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    enum: PostStatus,
    required: false,
    default: PostStatus.PUBLISHED,
    description: 'Post status: DRAFT or PUBLISHED',
  })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
