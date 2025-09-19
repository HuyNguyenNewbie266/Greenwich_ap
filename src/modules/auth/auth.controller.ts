import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { GoogleUserDto } from './dto/google-user.dto';
import { LoginResponseDto, RefreshResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import {
  ApiController,
  CommonApiResponses,
} from '../../common/decorators/swagger.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface GoogleAuthRequest extends Request {
  user?: GoogleUserDto;
}

interface JwtAuthRequest extends Request {
  user?: User;
}

@ApiController('Auth', { requireAuth: false })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @CommonApiResponses()
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @CommonApiResponses()
  googleLogin(): void {
    // passport will redirect
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @CommonApiResponses()
  async googleCallback(
    @Req() req: GoogleAuthRequest,
  ): Promise<LoginResponseDto> {
    if (!req.user || !req.user.email) {
      throw new Error('Google authentication failed');
    }
    return this.authService.handleGoogleLogin(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get authenticated user details' })
  @ApiResponse({
    status: 200,
    description: "Returns the authenticated user's details",
    type: User,
  })
  @CommonApiResponses()
  me(@Req() req: JwtAuthRequest): User {
    if (!req.user) {
      throw new Error('No authenticated user found');
    }

    return req.user;
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
  })
  @CommonApiResponses()
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshResponseDto> {
    return await this.authService.refreshTokens(refreshTokenDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout user and revoke refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  @CommonApiResponses()
  async logout(@Req() req: JwtAuthRequest): Promise<{ message: string }> {
    if (!req.user) {
      throw new Error('No authenticated user found');
    }

    await this.authService.logout(req.user.id);
    return { message: 'Logout successful' };
  }
}
