import { ApiProperty } from '@nestjs/swagger';

class ProfileDto {
  @ApiProperty({ required: false })
  avatarUrl?: string;
}

class CommentUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ type: ProfileDto, required: false })
  profile?: ProfileDto;
}

class CommentCountsDto {
  @ApiProperty()
  likes: number;

  @ApiProperty()
  replies: number;
}

export class CommentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: CommentUserDto })
  user: CommentUserDto;

  @ApiProperty({ type: CommentCountsDto })
  _count: CommentCountsDto;
}
