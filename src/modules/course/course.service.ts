import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private readonly repo: Repository<Course>) {}

  async findAll(opts?: {
    page?: number; limit?: number;
    departmentId?: number; code?: string; teacherId?: number; level?: string;
  }) {
    const qb = this.repo.createQueryBuilder('c');

    if (opts?.departmentId) qb.andWhere('c.departmentId = :d', { d: opts.departmentId });
    if (opts?.code) qb.andWhere('c.code ILIKE :q', { q: `%${opts.code}%` });
    if (opts?.teacherId) qb.andWhere('c.teacherId = :t', { t: opts.teacherId });
    if (opts?.level) qb.andWhere('c.level = :l', { l: opts.level });

    qb.orderBy('c.createdAt', 'DESC');

    if (opts?.limit) qb.take(opts.limit);
    if (opts?.page && opts.limit) qb.skip((opts.page - 1) * opts.limit);

    return qb.getMany();
  }

  async findOne(id: number) {
    const ent = await this.repo.findOne({ where: { id } });
    if (!ent) throw new NotFoundException('Course not found');
    return ent;
    }

  async create(dto: CreateCourseDto) {
    const ent = this.repo.create(dto as Course);
    return this.repo.save(ent);
  }

  async update(id: number, dto: UpdateCourseDto) {
    const ent = await this.findOne(id);
    Object.assign(ent, dto);
    return this.repo.save(ent);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete(id);
    return { deleted: true };
  }

  async findByDepartment(departmentId: number) {
    return this.repo.find({ where: { departmentId } });
  }
}
