import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Campus } from './entities/campus.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GoogleUserDto } from '../auth/dto/google-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Campus) private readonly campusRepo: Repository<Campus>,
  ) {}

  async findAll(opts?: { page?: number; limit?: number; search?: string }) {
    const qb = this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.role', 'role')
      .leftJoinAndSelect('u.campus', 'campus');
    if (opts?.search) {
      qb.where(
        'u.email ILIKE :q OR u.givenName ILIKE :q OR u.surname ILIKE :q',
        { q: `%${opts.search}%` },
      );
    }
    qb.orderBy('u.createdAt', 'DESC');
    if (opts?.limit) qb.take(opts.limit);
    if (opts?.page && opts.page > 0 && opts.limit)
      qb.skip((opts.page - 1) * opts.limit);
    return qb.getMany();
  }

  async findOne(id: number): Promise<User> {
    const u = await this.userRepo.findOne({
      where: { id },
      relations: ['role', 'campus'],
    });
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      relations: ['role', 'campus'],
    });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
    if (!role) throw new NotFoundException('Role not found');

    const campus = dto.campusId
      ? await this.campusRepo.findOne({ where: { id: dto.campusId } })
      : null;
    if (dto.campusId && !campus)
      throw new NotFoundException('Campus not found');

    const hashed = dto.password ? await bcrypt.hash(dto.password, 10) : null;

    const ent = this.userRepo.create({
      roleId: role.id,
      role,
      campusId: campus ? campus.id : null,
      campus: campus ?? null,
      email: dto.email,
      password: hashed,
      givenName: dto.givenName ?? null,
      surname: dto.surname ?? null,
      gender: dto.gender ?? 'UNSPECIFIED',
    } as Partial<User>);

    return this.userRepo.save(ent);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (dto.roleId) {
      const role = await this.roleRepo.findOne({ where: { id: dto.roleId } });
      if (!role) throw new NotFoundException('Role not found');
      user.roleId = role.id;
      user.role = role;
    }

    if (dto.campusId) {
      const campus = await this.campusRepo.findOne({
        where: { id: dto.campusId },
      });
      if (!campus) throw new NotFoundException('Campus not found');
      user.campusId = campus.id;
      user.campus = campus;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.givenName !== undefined) user.givenName = dto.givenName ?? null;
    if (dto.surname !== undefined) user.surname = dto.surname ?? null;
    if (dto.gender !== undefined) user.gender = dto.gender;

    return this.userRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  // For OAuth: find or create using google profile
  async createFromGoogle(profile: GoogleUserDto): Promise<User> {
    const existing = await this.findByEmail(profile.email);
    if (existing) return existing;

    const defaultRole = await this.roleRepo.findOne({
      where: { name: 'Student' },
    });

    if (!defaultRole) {
      throw new NotFoundException('No role available to assign');
    }

    const ent = this.userRepo.create({
      roleId: defaultRole.id,
      role: defaultRole,
      email: profile.email,
      password: null,
      givenName: profile.givenName ?? null,
      surname: profile.surname ?? null,
      avatar: profile.avatarUrl ?? null,
      gender: 'UNSPECIFIED',
    } as Partial<User>);

    return this.userRepo.save(ent);
  }
}
