import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Replace 'yourSecretKey' with a strong secret in production
      signOptions: { expiresIn: '15m' }, // Configure JWT expiration
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, GoogleStrategy, PrismaService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
