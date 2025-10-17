import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { Term } from './entities/term.entity';
import { Programme } from '../programme/entities/programme.entity';
import { Department } from '../department/entities/department.entity';
import { CreateTermDto } from './dto/create-term.dto';
import { UpdateTermDto } from './dto/update-term.dto';

interface FindAllOptions {
  page?: number;
  limit?: number;
  programmeId?: number;
  departmentId?: number;
  academicYear?: string;
  code?: string;
  name?: string;
}

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private readonly termRepo: Repository<Term>,
    @InjectRepository(Programme)
    private readonly programmeRepo: Repository<Programme>,
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
  ) {}

  async findAll(opts: FindAllOptions = {}) {
    const qb = this.termRepo
      .createQueryBuilder('term')
      .leftJoinAndSelect('term.programme', 'programme')
      .leftJoinAndSelect('term.departments', 'department')
      .distinct(true)
      .orderBy('term.start_date', 'DESC')
      .addOrderBy('term.id', 'DESC');

    if (opts.programmeId) {
      qb.andWhere('term.programme_id = :programmeId', {
        programmeId: opts.programmeId,
      });
    }
    if (opts.departmentId) {
      qb.andWhere('department.id = :departmentId', {
        departmentId: opts.departmentId,
      });
    }
    if (opts.academicYear) {
      qb.andWhere('term.academic_year = :academicYear', {
        academicYear: opts.academicYear,
      });
    }
    if (opts.code) {
      qb.andWhere('term.code ILIKE :code', { code: `%${opts.code}%` });
    }
    if (opts.name) {
      qb.andWhere('term.name ILIKE :name', { name: `%${opts.name}%` });
    }

    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const limit = opts.limit && opts.limit > 0 ? opts.limit : 25;
    qb.skip((page - 1) * limit).take(limit);

    return qb.getMany();
  }

  async findOne(id: number) {
    const term = await this.termRepo.findOne({
      where: { id },
      relations: ['programme', 'departments'],
    });
    if (!term) {
      throw new NotFoundException('Term not found');
    }
    return term;
  }

  async create(dto: CreateTermDto) {
    const programme = await this.programmeRepo.findOne({
      where: { id: dto.programmeId },
    });
    if (!programme) {
      throw new NotFoundException('Programme not found');
    }

    const departments = await this.loadDepartments(dto.departmentIds);

    const entity = this.termRepo.create({
      programme,
      programmeId: programme.id,
      code: dto.code,
      name: dto.name,
      academicYear: dto.academicYear ?? null,
      startDate: dto.startDate ?? null,
      endDate: dto.endDate ?? null,
      departments,
    } as DeepPartial<Term>);

    try {
      const saved = await this.termRepo.save(entity);
      return this.findOne(saved.id);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code: string }).code === '23505'
      ) {
        throw new ConflictException('Term code already exists for this programme');
      }
      throw error;
    }
  }

  async update(id: number, dto: UpdateTermDto) {
    const term = await this.termRepo.findOne({
      where: { id },
      relations: ['programme', 'departments'],
    });
    if (!term) {
      throw new NotFoundException('Term not found');
    }

    if (dto.programmeId !== undefined && dto.programmeId !== term.programmeId) {
      const programme = await this.programmeRepo.findOne({
        where: { id: dto.programmeId },
      });
      if (!programme) {
        throw new NotFoundException('Programme not found');
      }
      term.programme = programme;
      term.programmeId = programme.id;
    }

    if (dto.code !== undefined) term.code = dto.code;
    if (dto.name !== undefined) term.name = dto.name;
    if (dto.academicYear !== undefined) term.academicYear = dto.academicYear;
    if (dto.startDate !== undefined) term.startDate = dto.startDate;
    if (dto.endDate !== undefined) term.endDate = dto.endDate;

    if (dto.departmentIds !== undefined) {
      const departments = await this.loadDepartments(dto.departmentIds);
      term.departments = departments;
    }

    try {
      const saved = await this.termRepo.save(term);
      return this.findOne(saved.id);
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code: string }).code === '23505'
      ) {
        throw new ConflictException('Term code already exists for this programme');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const term = await this.termRepo.findOne({ where: { id } });
    if (!term) {
      throw new NotFoundException('Term not found');
    }
    await this.termRepo.remove(term);
    return { deleted: true };
  }

  private async loadDepartments(ids?: number[]) {
    if (!ids || ids.length === 0) {
      return [];
    }

    const departments = await this.departmentRepo.find({
      where: { id: In(ids) },
    });

    if (departments.length !== ids.length) {
      const foundIds = new Set(departments.map((dept) => Number(dept.id)));
      const missing = ids.filter((id) => !foundIds.has(Number(id)));
      throw new NotFoundException(
        `Departments not found: ${missing.map((id) => `#${id}`).join(', ')}`,
      );
    }

    return departments;
  }
}
