import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiController,
  ApiCreateOperation,
  ApiFindAllOperation,
  ApiFindOneOperation,
  ApiUpdateOperation,
  ApiDeactivateOperation,
  ApiStudentFilterQuery,
} from '../../common/decorators/swagger.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiController('Students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('access-token')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // CREATE
  @Post()
  @ApiCreateOperation(Student, 'Create new student')
  create(@Body() dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  // READ all
  @Get()
  @ApiFindAllOperation(Student, 'List all students')
  @ApiStudentFilterQuery()
  async findAll(
    @Query('campusId') campusId?: number,
    @Query('mentorId') mentorId?: number,
    @Query('status') status?: string,
    @Query('academicYear') academicYear?: string,
  ) {
    return this.studentService.findAll({
      campusId,
      mentorId,
      status,
      academicYear,
    });
  }

  // READ one
  @Get(':id')
  @ApiFindOneOperation(Student, 'Get student by ID')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @ApiUpdateOperation(Student, 'Update student details')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStudentDto) {
    return this.studentService.update(id, dto);
  }

  // DELETE (soft: set status=OTHER)
  @Patch(':id/deactivate')
  @ApiDeactivateOperation(Student)
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deactivate(id);
  }
}
