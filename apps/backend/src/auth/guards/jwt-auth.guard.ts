import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      request.cookies.access_token ||
      request.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      // Verify the access token
      const payload = this.jwtService.verify(accessToken);
      request.user = payload; // Attach user info to the request object
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
