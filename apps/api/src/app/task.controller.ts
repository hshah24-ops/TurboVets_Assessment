import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  console.log('TaskController Loaded');
}

  @Get()
  getAllTasks() {
    console.log('GET /tasks called');
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() data: Partial<Task>) {
  console.log('POST /tasks called');  
  return this.taskService.create(data);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() data: Partial<Task>) {
  console.log('PUT /tasks called');  
  return this.taskService.update(+id, data);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }
}