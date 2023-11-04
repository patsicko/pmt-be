import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({id});
  }

  async create(course: Course): Promise<Course> {
    return this.courseRepository.save(course);
  }

  async update(id: number, course: Course): Promise<Course> {
    await this.courseRepository.update(id, course);
    return this.courseRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
