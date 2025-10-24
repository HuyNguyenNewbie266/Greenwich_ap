import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiController,
  CommonApiResponses,
} from '../../common/decorators/swagger.decorator';
import { AdminService } from './admin.service';
import { UserService } from '../user/user.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminPasswordDto } from './dto/update-admin.dto';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/roles.enum';

@ApiController('Admin', { requireAuth: true })
@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new admin user with password' })
  @ApiResponse({
    status: 201,
    description: 'Admin user created successfully',
    type: User,
  })
  @CommonApiResponses()
  async create(@Body() dto: CreateAdminDto): Promise<User> {
    // Get the Admin role
    const adminRole = await this.userService.findRoleByName('Admin');

    // Create the user account
    const user = await this.userService.create({
      email: dto.email,
      roleId: adminRole.id,
      campusId: dto.campusId,
      givenName: dto.givenName,
      surname: dto.surname,
      phone: dto.phone,
      phoneAlt: dto.phoneAlt,
      address: dto.address,
      avatar: dto.avatar,
      note: dto.note,
      dateOfBirth: dto.dateOfBirth,
      gender: dto.gender,
    });

    // Create the admin record with password
    await this.adminService.create(user.id, dto.password);

    return user;
  }

  @Patch(':id/password')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update admin password' })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
  })
  @CommonApiResponses()
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminPasswordDto,
  ): Promise<{ message: string }> {
    // Verify user exists and is admin
    const user = await this.userService.findOne(id);
    if (user.role?.name !== 'Admin') {
      throw new UnauthorizedException('User is not an admin');
    }

    await this.adminService.updatePassword(id, dto.password);
    return { message: 'Password updated successfully' };
  }
}
