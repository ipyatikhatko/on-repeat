import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Request,
  UnauthorizedException,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request as ExpresssReq } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current user',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string', nullable: true },
        username: { type: 'string', nullable: true },
        isVerified: { type: 'boolean' },
        profile: {
          type: 'object',
          properties: {
            avatarUrl: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getCurrentUser(@Request() req: ExpresssReq) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      isVerified: user.isVerified,
    };
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAvatarDto })
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    // TODO: Implement file upload to chosen storage service
    const avatarUrl = `https://placeholder.com/${file.originalname}`;
    return this.userService.updateAvatar(req.user.sub, avatarUrl);
  }
}
