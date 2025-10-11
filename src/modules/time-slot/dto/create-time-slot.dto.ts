import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateTimeSlotDto {
  @SwaggerProperty({
    description: 'The name of the time slot',
    example: 'Slot 1',
import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateTimeSlotDto {
  @SwaggerProperty({
    description: 'The name of the time slot',
    example: 'Slot 1',
import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateTimeSlotDto {
  @SwaggerProperty({
    description: 'The name of the time slot',
    example: 'Slot 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @SwaggerProperty({
    description: 'The start time of the slot (HH:mm:ss)',
    example: '07:30:00',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:mm:ss',
  })
  startTime: string;

  @SwaggerProperty({
    description: 'The end time of the slot (HH:mm:ss)',
    example: '09:00:00',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm:ss',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm:ss',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm:ss',
  })
  endTime: string;
}
