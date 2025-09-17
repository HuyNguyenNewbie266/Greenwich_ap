import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  ApiDeleteOperation,
  ApiPaginationQuery,
} from '../../common/decorators/swagger.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiController('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly svc: UserService) {}

  @Post()
  @ApiCreateOperation(User)
  create(@Body() dto: CreateUserDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiFindAllOperation(User)
  @ApiPaginationQuery()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.svc.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 25,
      search,
    });
  }

  @Get(':id')
  @ApiFindOneOperation(User)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  @ApiUpdateOperation(User)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiDeleteOperation(User)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
