import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponse, PaginationDto } from '../../common/pagination/pagination.dto';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';
import { Term } from './entities/term.entity';

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepository: Repository<Term>,
  ) {}

  async create(dto: CreateTermDto): Promise<Term> {
    try {
      const entity = this.termRepository.create(dto);
      return await this.termRepository.save(entity);
    } catch (error) {
      if ((error as Error).message.includes('UQ_terms_programme_code')) {
        throw new ConflictException('Term code must be unique within the programme');
      }
      throw error;
    }
  }

  async findAll(programmeId: string, pagination: PaginationDto): Promise<PaginatedResponse<Term>> {
    const { page, limit } = pagination;
    const [data, total] = await this.termRepository.findAndCount({
      where: { programmeId },
      order: { order: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: { total, page, limit },
    };
  }

  async findOne(id: string): Promise<Term> {
    const term = await this.termRepository.findOne({ where: { id } });
    if (!term) {
      throw new NotFoundException(`Term ${id} not found`);
    }
    return term;
  }

  async update(id: string, dto: UpdateTermDto): Promise<Term> {
    const term = await this.findOne(id);
    Object.assign(term, dto);
    try {
      return await this.termRepository.save(term);
    } catch (error) {
      if ((error as Error).message.includes('UQ_terms_programme_code')) {
        throw new ConflictException('Term code must be unique within the programme');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.termRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Term ${id} not found`);
    }
  }
}
