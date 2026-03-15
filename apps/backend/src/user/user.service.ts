// src/user/user.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: {
    email?: string;
    password?: string;
    username?: string;
    emailVerificationToken?: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByVerificationToken(token: string) {
    return this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });
  }

  async markEmailAsVerified(userId: number) {
    try {
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          isVerified: true,
          emailVerificationToken: null, // Remove the verification token
        },
      });
    } catch {
      throw new NotFoundException('Invalid token, user not found');
    }
  }

  async updateUserRefreshToken(userId: number, refreshToken: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async findById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async updateAvatar(userId: number, avatarUrl: string) {
    // Create profile if it doesn't exist
    const profile = await this.prisma.profile.upsert({
      where: { userId },
      update: { avatarUrl },
      create: { userId, avatarUrl },
    });

    return profile;
  }

  async getProfile(userId: number) {
    const profile = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('User not found');
    }

    return profile;
  }
}
