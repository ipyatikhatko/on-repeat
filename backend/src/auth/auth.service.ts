// src/auth/auth.service.ts

import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {
    // Nodemailer transport configuration for Gmail
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // App password if 2FA is enabled
      },
    });
  }

  async signUp(email: string, password: string, username: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    try {
      const user = await this.userService.createUser({
        email,
        password: hashedPassword,
        username,
        emailVerificationToken,
      });
      await this.sendVerificationEmail(user.email, emailVerificationToken);
      return { message: 'User created, verification email sent.' };
    } catch {
      throw new ConflictException('Email already exists.');
    }
  }

  async signIn(email: string, password: string, res: Response) {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    // Generate access token
    const accessToken = this.generateAccessToken(payload);

    // Generate refresh token
    const refreshToken = this.generateRefreshToken(payload);

    // Hash refresh token and save it to the database
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateUserRefreshToken(user.id, hashedRefreshToken);

    // Set both tokens as HttpOnly cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).send({ message: 'Login successful' });

    return res;
  }

  async verifyEmail(token: string, res: Response) {
    const user = await this.userService.findByVerificationToken(token);
    if (!user) {
      throw new NotFoundException('Invalid token');
    }
    await this.userService.markEmailAsVerified(user.id);
    res.status(200).send({ message: 'Email verified!' });
  }

  private async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_HOST}/auth/verify-email?token=${token}`;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click the link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async refreshToken(refreshToken: string, res: Response) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userService.findById(payload.sub);
      // Check if the refresh token matches the stored hashed token
      const isTokenValid = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );
      if (!isTokenValid) {
        throw new UnauthorizedException();
      }
      // Generate a new access token
      const newAccessToken = this.generateAccessToken({
        sub: user.id,
        email: user.email,
      });
      // Set new access token as a cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      });

      res.status(200).send({ message: 'Access token refreshed' });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateOAuthUser(profile: any, provider: string) {
    const { email, sub: providerId, name } = profile._json;

    // Start a transaction to ensure data consistency
    return await this.prisma.$transaction(async (prisma) => {
      // First, try to find an existing OAuth account
      const oauthAccount = await prisma.oAuthAccount.findFirst({
        where: {
          provider,
          providerId,
        },
        include: {
          user: true,
        },
      });

      // If OAuth account exists, return the associated user
      if (oauthAccount) {
        return oauthAccount.user;
      }

      // If no OAuth account exists, check if user exists with the email
      let user = await prisma.user.findUnique({
        where: { email },
      });

      // If no user exists, create new user and OAuth account
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            username: name || email.split('@')[0],
            isVerified: true, // OAuth users are considered verified
            oauthAccounts: {
              create: {
                provider,
                providerId,
              },
            },
          },
        });
      } else {
        // If user exists, link the OAuth account
        await prisma.oAuthAccount.create({
          data: {
            provider,
            providerId,
            userId: user.id,
          },
        });
      }

      return user;
    });
  }

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
