import { SwaggerProperty } from 'src/common/decorators/swagger.decorator';

export class CreateTimeSlotDto {
  @SwaggerProperty({
    description: 'The name of the time slot',
    example: 'Slot 1',
  })
  name: string;

  @SwaggerProperty({
    description: 'The start time of the slot (HH:mm:ss)',
    example: '07:30:00',
  })
  startTime: string;

  @SwaggerProperty({
    description: 'The end time of the slot (HH:mm:ss)',
    example: '09:00:00',
  })
  endTime: string;
}
