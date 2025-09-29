import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { AddCourseDto } from './dto/add-course.dto';
import { ClassCourse } from './entities/class-course.entity';
import { Course } from '../course/entities/course.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(ClassCourse)
    private readonly classCourseRepository: Repository<ClassCourse>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  create(createClassDto: CreateClassDto) {
    const newClass = this.classRepository.create(createClassDto);
    return this.classRepository.save(newClass);
  }

  findAll() {
    return this.classRepository.find();
  }

  async findOne(id: number, relations: string[] = []) {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations,
    });
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    return classEntity;
  }

  async update(id: number, updateClassDto: UpdateClassDto) {
    await this.classRepository.update(id, updateClassDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.classRepository.delete(id);
  }

  async addCourse(id: number, addCourseDto: AddCourseDto) {
    const classEntity = await this.findOne(id);

    const course = await this.courseRepository.findOneBy({
      id: addCourseDto.courseId,
    });
    if (!course) {
      throw new NotFoundException(
        `Course with ID ${addCourseDto.courseId} not found`,
      );
    }

    const newClassCourse = this.classCourseRepository.create({
      class: classEntity,
      course: course,
      note: addCourseDto.note,
    });

    return this.classCourseRepository.save(newClassCourse);
  }

  async removeCourse(id: number, courseId: number) {
    const classCourse = await this.classCourseRepository.findOne({
      where: { class: { id }, course: { id: courseId } },
    });

    if (!classCourse) {
      throw new NotFoundException(
        `Course with ID ${courseId} not found in class with ID ${id}`,
      );
    }

    return this.classCourseRepository.remove(classCourse);
  }

  async findStudentsByClass(id: number) {
    const classEntity = await this.findOne(id);
    return this.studentRepository.find({
      where: { class: { id: classEntity.id } },
    });
  }

  async findCoursesByClass(id: number) {
    const classCourses = await this.classCourseRepository.find({
      where: { class: { id } },
      relations: ['course'],
    });
    return classCourses.map((cc) => cc.course);
  }
}
