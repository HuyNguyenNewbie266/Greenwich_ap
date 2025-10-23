import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { PaginatedResponse, PaginationDto } from '../../common/pagination/pagination.dto';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';
import { Programme } from './entities/programme.entity';

@Injectable()
export class ProgrammeService {
  constructor(
    @InjectRepository(Programme)
    private readonly programmeRepository: Repository<Programme>,
  ) {}

  async create(dto: CreateProgrammeDto): Promise<Programme> {
    const entity = this.programmeRepository.create(dto);
    return this.programmeRepository.save(entity);
  }

  async findAll(pagination: PaginationDto, search?: string): Promise<PaginatedResponse<Programme>> {
    const { page, limit } = pagination;
    const options: FindManyOptions<Programme> = {
      skip: (page - 1) * limit,
      take: limit,
      order: { code: 'ASC' },
    };

    if (search) {
      options.where = [{ code: ILike(`%${search}%`) }, { name: ILike(`%${search}%`) }];
    }

    const [data, total] = await this.programmeRepository.findAndCount(options);
    return {
      data,
      meta: { total, page, limit },
    };
  }

  async findOne(id: string): Promise<Programme> {
    const programme = await this.programmeRepository.findOne({ where: { id } });
    if (!programme) {
      throw new NotFoundException(`Programme ${id} not found`);
    }
    return programme;
  }

  async update(id: string, dto: UpdateProgrammeDto): Promise<Programme> {
    const programme = await this.findOne(id);
    Object.assign(programme, dto);
    return this.programmeRepository.save(programme);
  }

  async remove(id: string): Promise<void> {
    const result = await this.programmeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Programme ${id} not found`);
    }
  }
}
