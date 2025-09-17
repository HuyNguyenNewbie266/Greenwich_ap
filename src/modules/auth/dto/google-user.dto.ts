import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';

export class GoogleUserDto {
  @SwaggerProperty({
    description: 'Email from Google',
    example: 'alice@gmail.com',
  })
  email!: string;

  @SwaggerProperty({ description: 'Given name from Google', required: false })
  givenName?: string | null;

  @SwaggerProperty({ description: 'Family name from Google', required: false })
  surname?: string | null;

  @SwaggerProperty({ description: 'Avatar URL from Google', required: false })
  avatarUrl?: string | null;
}
