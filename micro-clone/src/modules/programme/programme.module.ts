import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programme } from './entities/programme.entity';
import { ProgrammeController } from './programme.controller';
import { ProgrammeService } from './programme.service';

@Module({
  imports: [TypeOrmModule.forFeature([Programme])],
  controllers: [ProgrammeController],
  providers: [ProgrammeService],
  exports: [ProgrammeService],
})
export class ProgrammeModule {}
