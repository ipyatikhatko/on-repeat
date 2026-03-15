import { ApiProperty } from '@nestjs/swagger';

class ProfileDto {
  @ApiProperty({ required: false })
  avatarUrl?: string;
}

class AuthorDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ type: ProfileDto })
  profile?: ProfileDto;
}

class CountsDto {
  @ApiProperty()
  likes: number;

  @ApiProperty()
  comments: number;
}

export class PostResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  content: string;

  @ApiProperty({ enum: ['DRAFT', 'PUBLISHED'] })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  authorId: number;

  @ApiProperty({ required: false })
  mediaUrl?: string;

  @ApiProperty()
  viewCount: number;

  @ApiProperty()
  shareCount: number;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ type: CountsDto })
  _count: CountsDto;
}
