import { Module } from '@nestjs/common';
import { TimeSlotService } from './time-slot.service';
import { TimeSlotController } from './time-slot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { ClassSession } from '../class/entities/class-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSlot, ClassSession])],
  controllers: [TimeSlotController],
  providers: [TimeSlotService],
  exports: [TimeSlotService],
})
export class TimeSlotModule {}
