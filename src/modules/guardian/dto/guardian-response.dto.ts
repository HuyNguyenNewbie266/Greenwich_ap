import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class UserMiniDto {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  givenName!: string;

  @ApiProperty()
  @Expose()
  phone!: number;

  @ApiProperty()
  @Expose()
  phoneAlt?: string;

  @ApiProperty()
  @Expose()
  email!: string;
}

export class GuardianResponseDto {
  @ApiProperty()
  @Expose()
  id!: number;

  @ApiProperty()
  @Expose()
  userId!: number;

  @ApiProperty({ required: false })
  @Expose()
  occupation?: string;

  @ApiProperty({ required: false })
  @Expose()
  notes?: string;

  @ApiProperty({ type: () => UserMiniDto })
  @Expose()
  @Type(() => UserMiniDto)
  user!: UserMiniDto;
}
