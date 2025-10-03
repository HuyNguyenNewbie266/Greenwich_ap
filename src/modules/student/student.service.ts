import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { User } from '../user/entities/user.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Class } from '../class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) {}

  // CREATE
  async create(dto: CreateStudentDto): Promise<Student> {
    const user = await this.userRepo.findOne({
      where: { id: dto.userId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('User not found');

    // Check role = STUDENT
    if (!user.role || user.role.name !== 'Student') {
      throw new BadRequestException('User is not assigned role Student');
    }

    // Generate code if not provided
    const code = dto.studentCode ?? `FGW000${user.id}`;

    // Check duplicate studentCode
    const existingCode = await this.studentRepo.findOne({
      where: { studentCode: code },
    });
    if (existingCode)
      throw new BadRequestException('Student code already exists');

    let mentor: User | null = null;
    if (dto.mentorId) {
      mentor = await this.userRepo.findOne({ where: { id: dto.mentorId } });
      if (!mentor) throw new NotFoundException('Mentor not found');
    }

    if (dto.classId) {
      const existingClass = await this.classRepo.findOne({
        where: { id: dto.classId },
      });
      if (!existingClass) throw new NotFoundException('Class not found');
    }

    const student = this.studentRepo.create({
      ...dto,
      studentCode: code,
      user,
      mentor,
    });

    return this.studentRepo.save(student);
  }

  // READ all with filters
  async findAll(filter?: {
    campusId?: number;
    mentorId?: number;
    status?: string;
    academicYear?: string;
  }): Promise<Student[]> {
    const qb = this.studentRepo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.user', 'u')
      .leftJoinAndSelect('s.mentor', 'm')
      .orderBy('s.createdAt', 'DESC');

    if (filter?.campusId) {
      qb.andWhere('u.campusId = :campusId', { campusId: filter.campusId });
    }

    if (filter?.mentorId) {
      qb.andWhere('s.mentorId = :mentorId', { mentorId: filter.mentorId });
    }

    if (filter?.status) {
      qb.andWhere('s.status = :status', { status: filter.status });
    }

    if (filter?.academicYear) {
      qb.andWhere('s.academicYear = :academicYear', {
        academicYear: filter.academicYear,
      });
    }

    return qb.getMany();
  }

  // READ one
  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['user', 'mentor'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // UPDATE
  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOne({
        where: { id: dto.userId },
        relations: ['role'],
      });
      if (!user) throw new NotFoundException('User not found');
      if (!user.role || user.role.name !== 'Student') {
        throw new BadRequestException('User is not assigned role Student');
      }
      student.user = user;
    }

    if (dto.mentorId) {
      const mentor = await this.userRepo.findOne({
        where: { id: dto.mentorId },
      });
      if (!mentor) throw new NotFoundException('Mentor not found');
      student.mentor = mentor;
    }

    if (dto.studentCode) {
      const existingCode = await this.studentRepo.findOne({
        where: { studentCode: dto.studentCode },
      });
      if (existingCode && existingCode.id !== id) {
        throw new BadRequestException('Student code already exists');
      }
      student.studentCode = dto.studentCode;
    }

    if (dto.classId) {
      const existingClass = await this.classRepo.findOne({
        where: { id: dto.classId },
      });
      if (!existingClass) throw new NotFoundException('Class not found');
    }

    Object.assign(student, dto);

    return this.studentRepo.save(student);
  }

  // DELETE (soft: set status = INACTIVE)
  async deactivate(id: number): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException(`Student not found`);
    }
    student.status = 'OTHER';
    if (student.user) {
      student.user.status = 'INACTIVE';
      await this.userRepo.save(student.user);
    }
    return await this.studentRepo.save(student);
  }
}
