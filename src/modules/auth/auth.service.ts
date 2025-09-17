import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { GoogleUserDto } from './dto/google-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from '../user/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async handleGoogleLogin(profile: GoogleUserDto): Promise<LoginResponseDto> {
    try {
      let user: User | null = await this.userService.findByEmail(profile.email);

      if (!user) {
        user = await this.userService.createFromGoogle(profile);
      }

      if (!user) {
        throw new UnauthorizedException('Unable to login/create user');
      }

      const payload: JwtPayload = {
        sub: user.id.toString(),
        email: user.email,
        role: user.role?.name ?? null,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken, user };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new UnauthorizedException(err.message);
      }
      throw new UnauthorizedException('Google login failed');
    }
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.userService.findOne(Number(payload.sub));

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.role) {
        throw new UnauthorizedException('User role not found');
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('User validation failed');
    }
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }

      if (!user.password) {
        throw new UnauthorizedException('This account uses Google login only');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const payload: JwtPayload = {
        sub: user.id.toString(),
        email: user.email,
        role: user.role?.name ?? null,
      };

      const accessToken = this.jwtService.sign(payload);

      return { accessToken, user };
    } catch (err: unknown) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      if (err instanceof Error) {
        throw new UnauthorizedException(err.message);
      }
      throw new UnauthorizedException('Login failed');
    }
  }
}
