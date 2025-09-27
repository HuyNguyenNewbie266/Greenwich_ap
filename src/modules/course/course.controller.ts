import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  Query, ParseIntPipe, UseGuards
} from '@nestjs/common';
import {
  ApiController, ApiCreateOperation, ApiFindAllOperation, ApiFindOneOperation,
  ApiUpdateOperation, ApiDeleteOperation, ApiPaginationQuery
} from '../../common/decorators/swagger.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiController('Courses')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
export class CourseController {
  constructor(private readonly svc: CourseService) {}

  // Create: admins only
  @Post()
  @Roles('admin')
  @ApiCreateOperation(Course)
  create(@Body() dto: CreateCourseDto) {
    return this.svc.create(dto);
  }

  // List: everyone authenticated
  @Get()
  @Roles('admin','guardian','teacher','student')
  @ApiFindAllOperation(Course)
  @ApiPaginationQuery()
  @ApiQuery({ name: 'departmentId', required: false, type: Number })
  @ApiQuery({ name: 'code', required: false, type: String })
  @ApiQuery({ name: 'teacherId', required: false, type: Number })
  @ApiQuery({ name: 'level', required: false, type: String })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('departmentId') departmentId?: number,
    @Query('code') code?: string,
    @Query('teacherId') teacherId?: number,
    @Query('level') level?: string,
  ) {
    return this.svc.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 25,
      departmentId: departmentId ? Number(departmentId) : undefined,
      code,
      teacherId: teacherId ? Number(teacherId) : undefined,
      level,
    });
  }

  // Read: everyone authenticated
  @Get(':id')
  @Roles('admin','guardian','teacher','student')
  @ApiFindOneOperation(Course)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  // Update: admins only
  @Patch(':id')
  @Roles('admin')
  @ApiUpdateOperation(Course)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto) {
    return this.svc.update(id, dto);
  }

  // Delete: admins only
  @Delete(':id')
  @Roles('admin')
  @ApiDeleteOperation(Course)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }

  // Bonus: “/departments/{id}/courses” per API doc
  @Get('/by-department/:departmentId')
  @Roles('admin','guardian','teacher','student')
  @ApiFindAllOperation(Course, 'Get courses by department')
  findByDepartment(@Param('departmentId', ParseIntPipe) departmentId: number) {
    return this.svc.findByDepartment(departmentId);
  }
}
