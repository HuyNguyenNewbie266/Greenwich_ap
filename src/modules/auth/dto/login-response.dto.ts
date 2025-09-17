import { SwaggerProperty } from '../../../common/decorators/swagger.decorator';
import { User } from '../../user/entities/user.entity';

export class LoginResponseDto {
  @SwaggerProperty({ description: 'JWT access token' })
  accessToken!: string;

  @SwaggerProperty({ description: 'User info', type: User })
  user!: User;
}
