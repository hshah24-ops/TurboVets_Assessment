import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepo.find();
  }

  findOne(id: number) {
    return this.taskRepo.findOne({ where: { id } });
  }

  create(taskData: Partial<Task>) {
    const task = this.taskRepo.create(taskData);
    return this.taskRepo.save(task);
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.taskRepo.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.taskRepo.delete(id);
  }
}