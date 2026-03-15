import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPermanentRedirectResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignUpDto } from './dto/SignUpDto';
import { SignInDto } from './dto/SignInDto';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard) // This will trigger the OAuth flow
  async googleAuth() {
    // Initiates the Google authentication process.
    // The GoogleAuthGuard will handle the redirection.
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.authService.generateAccessToken(payload);
    const refreshToken = this.authService.generateRefreshToken(payload);

    // Hash and store refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateUserRefreshToken(user.id, hashedRefreshToken);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.redirect(`${process.env.FRONTEND_HOST}/feed`);
  }

  @ApiOkResponse({ description: 'User created, verification email sent.' })
  @ApiConflictResponse({ description: 'Email already exists.' })
  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    const { email, password, username } = body;
    return this.authService.signUp(email, password, username);
  }

  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiOkResponse({ description: 'Cookie set' })
  @Post('signin')
  async signIn(@Body() body: SignInDto, @Res() res: Response) {
    return this.authService.signIn(body.email, body.password, res);
  }

  @ApiNotFoundResponse({ description: 'Invalid token' })
  @ApiPermanentRedirectResponse({
    description: 'Successfully Redirected to frontend',
  })
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    return this.authService.verifyEmail(token, res);
  }

  @ApiUnauthorizedResponse({
    description: 'Refresh token is invalid or missing',
  })
  @ApiOkResponse({ description: 'Access token refreshed' })
  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return this.authService.refreshToken(refreshToken, res);
  }

  @ApiOkResponse({ description: 'Cookies cleared' })
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }
}
