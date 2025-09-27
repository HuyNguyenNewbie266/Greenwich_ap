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
  Req,
} from '@nestjs/common';
import {
  ApiController,
  ApiCreateOperation,
  ApiFindAllOperation,
  ApiFindOneOperation,
  ApiUpdateOperation,
  ApiDeleteOperation,
  ApiPaginationQuery,
  ApiActivateOperation,
  ApiDeactivateOperation,
} from '../../common/decorators/swagger.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateOwnProfileDto } from './dto/update-own-profile.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

interface JwtAuthRequest extends Request {
  user?: User;
}

@ApiController('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ---------USERS---------
  // PATCH/users/me (Update own profile)
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update own profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated',
    type: User,
  })
  async updateMe(
    @Req() req: JwtAuthRequest,
    @Body() dto: UpdateOwnProfileDto,
  ): Promise<User> {
    if (!req.user) {
      throw new Error('No authenticated user found');
    }

    return await this.userService.updateProfile(req.user.id, dto);

    // const updated = await this.userService.updateProfile(req.user.id, dto);
    // return {
    //   phone: updated.phone ?? undefined,
    //   avatar: updated.avatar ?? undefined,
    // };
  }

  // ---------ADMIN---------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')

  // CREATE
  @Post()
  @ApiOperation({ summary: 'Create new user (STAFF only)' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  @ApiCreateOperation(User)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  // READ all
  @Get()
  @ApiOperation({ summary: 'List all users (STAFF only)' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @ApiFindAllOperation(User)
  @ApiPaginationQuery()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.userService.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 25,
      search,
    });
  }

  // READ one
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details', type: User })
  @ApiFindOneOperation(User)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  @ApiOperation({ summary: 'Update user details (STAFF only)' })
  @ApiResponse({ status: 200, description: 'User updated', type: User })
  @ApiUpdateOperation(User)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  // ACTIVATE (soft: set status=ACTIVE)
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate user (set status=ACTIVE)' })
  @ApiResponse({
    status: 200,
    description: 'User activated',
    type: User,
  })
  @ApiActivateOperation(User)
  activate(@Param('id', ParseIntPipe) id: number) {
    return this.userService.activate(id);
  }

  // DELETE (soft: set status=INACTIVE)
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate user (set status=INACTIVE)' })
  @ApiResponse({
    status: 200,
    description: 'User deactivated',
    type: User,
  })
  @ApiDeactivateOperation(User)
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deactivate(id);
  }

  // DELETE (remove user)
  @Delete(':id')
  @ApiDeleteOperation(User)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
