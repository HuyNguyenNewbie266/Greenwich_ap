import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guardian } from './entities/guardian.entity';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { GuardianResponseDto } from './dto/guardian-response.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(Guardian)
    private readonly guardianRepo: Repository<Guardian>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private toResponse(entity: Guardian): GuardianResponseDto {
    return plainToInstance(GuardianResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  private async findEntityById(id: number): Promise<Guardian> {
    const guardian = await this.guardianRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!guardian) throw new NotFoundException('Guardian not found');
    return guardian;
  }

  async create(dto: CreateGuardianDto): Promise<{ success: boolean }> {
    const entity = this.guardianRepo.create(dto);
    await this.guardianRepo.save(entity);
    return { success: true };
  }

  async findAll(): Promise<GuardianResponseDto[]> {
    const guardians = await this.guardianRepo.find({ relations: ['user'] });
    return guardians.map((g) => this.toResponse(g));
  }

  async findOne(id: number): Promise<GuardianResponseDto> {
    const guardian = await this.findEntityById(id);
    return this.toResponse(guardian);
  }

  async update(
    id: number,
    dto: UpdateGuardianDto,
  ): Promise<GuardianResponseDto> {
    const guardian = await this.findEntityById(id);

    if (dto.userId) {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User ID not found to update');
      guardian.userId = user.id;
      guardian.user = user;
    }

    if (dto.occupation !== undefined) guardian.occupation = dto.occupation;
    if (dto.notes !== undefined) guardian.notes = dto.notes;

    const saved = await this.guardianRepo.save(guardian);
    return this.toResponse(saved);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const guardian = await this.guardianRepo.delete(id);
    if (guardian.affected === 0) {
      throw new NotFoundException('User ID not found to remove');
    }
    return { success: true };
  }
}
