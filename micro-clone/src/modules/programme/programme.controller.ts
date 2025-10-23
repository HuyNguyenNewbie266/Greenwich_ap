import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { Programme } from './entities/programme.entity';
import { ProgrammeService } from './programme.service';

@ApiBearerAuth()
@ApiTags('Programmes')
@Controller({ path: 'programmes', version: '1' })
export class ProgrammeController {
  constructor(private readonly programmeService: ProgrammeService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProgrammeDto): Promise<Programme> {
    return this.programmeService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() pagination: PaginationDto, @Query('search') search?: string) {
    return this.programmeService.findAll(pagination, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programmeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProgrammeDto) {
    return this.programmeService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programmeService.remove(id);
  }
}
