import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { TermService } from './term.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Terms')
@Controller({ path: 'terms', version: '1' })
export class TermController {
  constructor(private readonly termService: TermService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTermDto) {
    return this.termService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('programme/:programmeId')
  findByProgramme(
    @Param('programmeId') programmeId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.termService.findAll(programmeId, pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTermDto) {
    return this.termService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termService.remove(id);
  }
}
