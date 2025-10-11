import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { Repository } from 'typeorm';
import { ClassSession } from '../class/entities/class-session.entity';
import { AssignTimeSlotDto } from './dto/assign-time-slots.dto';

@Injectable()
export class TimeSlotService {
  constructor(
    @InjectRepository(TimeSlot)
    private readonly timeSlotRepository: Repository<TimeSlot>,
    @InjectRepository(ClassSession)
    private readonly classSessionRepository: Repository<ClassSession>,
  ) {}

  create(createTimeSlotDto: CreateTimeSlotDto) {
    const timeSlot = this.timeSlotRepository.create(createTimeSlotDto);
    return this.timeSlotRepository.save(timeSlot);
  }

  findAll() {
    return this.timeSlotRepository.find();
  }

  async findOne(id: number) {
    const timeSlot = await this.timeSlotRepository.findOne({
      where: { id },
    });

    if (!timeSlot) {
      throw new NotFoundException(`Time slot with ID ${id} not found`);
    }

    return timeSlot;
  }

  async update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    const timeSlot = await this.findOne(id);
    Object.assign(timeSlot, updateTimeSlotDto);
    return this.timeSlotRepository.save(timeSlot);
  }

  async remove(id: number) {
    const timeSlot = await this.findOne(id);
    await this.timeSlotRepository.remove(timeSlot);
  }

  async assignSlotToSession(assignTimeSlotDto: AssignTimeSlotDto) {
    const { sessionId, slotId } = assignTimeSlotDto;

    const session = await this.classSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['timeSlots'],
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    const timeSlot = await this.findOne(slotId);

    // Check if already assigned
    if (!session.timeSlots) {
      session.timeSlots = [];
    }

    const alreadyAssigned = session.timeSlots.some(
      (slot) => slot.id === slotId,
    );

    if (alreadyAssigned) {
      return { message: 'Time slot already assigned to this session', session };
    }

    session.timeSlots.push(timeSlot);
    await this.classSessionRepository.save(session);

    return session;
  }

  async getSessionSlots(sessionId: number) {
    const session = await this.classSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['timeSlots'],
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    return session.timeSlots || [];
  }

  async removeSlotFromSession(sessionId: number, slotId: number) {
    const session = await this.classSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['timeSlots'],
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${sessionId} not found`);
    }

    if (!session.timeSlots) {
      session.timeSlots = [];
    }

    session.timeSlots = session.timeSlots.filter((slot) => slot.id !== slotId);
    await this.classSessionRepository.save(session);

    return { message: 'Time slot removed from session' };
  }
}
