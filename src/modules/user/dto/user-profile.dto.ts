import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';

export class UserProfileDto {
  @SwaggerProperty({
    description: 'Phone number',
    required: false,
    example: '0123456789',
  })
  phone?: string | null;

  @SwaggerProperty({
    description: 'Avatar URL',
    required: false,
    example: 'luan.png',
  })
  avatar?: string | null;
}
