import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campus } from '../user/entities/campus.entity';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(Campus) private readonly repo: Repository<Campus>,
  ) {}

  async findAll(opts?: { page?: number; limit?: number; search?: string }) {
    const qb = this.repo.createQueryBuilder('c');

    if (opts?.search) {
      qb.andWhere('(c.code ILIKE :q OR c.name ILIKE :q)', {
        q: `%${opts.search}%`,
      });
    }

    qb.orderBy('c.id', 'DESC');

    const page = opts?.page && opts.page > 0 ? opts.page : 1;
    const limit = opts?.limit && opts.limit > 0 ? opts.limit : 25;

    qb.skip((page - 1) * limit).take(limit);

    return qb.getMany();
  }

  async findOne(id: number) {
    const campus = await this.repo.findOne({ where: { id } });
    if (!campus) throw new NotFoundException('Campus not found');
    return campus;
  }

  async create(dto: CreateCampusDto) {
    try {
      const campus = this.repo.create(dto as Campus);
      return await this.repo.save(campus);
    } catch (e: unknown) {
      if (
        typeof e === 'object' &&
        e !== null &&
        'code' in e &&
        (e as { code: string }).code === '23505'
      ) {
        throw new ConflictException('Campus code already exists');
      }
      throw e;
    }
  }

  async update(id: number, dto: UpdateCampusDto) {
    const campus = await this.findOne(id);
    Object.assign(campus, dto);
    return this.repo.save(campus);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }
}
