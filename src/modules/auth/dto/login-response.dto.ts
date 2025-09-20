import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';

export class LoginResponseDto {
  @SwaggerProperty({ description: 'JWT access token' })
  accessToken!: string;

  @SwaggerProperty({ description: 'JWT refresh token' })
  refreshToken!: string;
}

export class RefreshResponseDto {
  @SwaggerProperty({ description: 'New JWT access token' })
  accessToken!: string;

  @SwaggerProperty({ description: 'New refresh token' })
  refreshToken!: string;
}
