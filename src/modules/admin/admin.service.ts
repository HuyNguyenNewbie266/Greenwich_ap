import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findByUserId(userId: number): Promise<Admin | null> {
    return await this.adminRepository.findOne({
      where: { userId },
    });
  }

  async findByUserIdOrFail(userId: number): Promise<Admin> {
    const admin = await this.findByUserId(userId);
    if (!admin) {
      throw new NotFoundException(`Admin with user ID ${userId} not found`);
    }
    return admin;
  }

  async create(userId: number, password: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = this.adminRepository.create({
      userId,
      password: hashedPassword,
    });
    return await this.adminRepository.save(admin);
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.adminRepository.update({ userId }, { password: hashedPassword });
  }
}
