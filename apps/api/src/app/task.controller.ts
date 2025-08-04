import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { PermissionsGuard } from './permissions.guard';   
import { Permissions } from './permissions.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard, PermissionsGuard) 
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  console.log('TaskController Loaded');
}

  @Get()
  @Permissions('view_task')
  getAllTasks() {
    console.log('GET /tasks called');
    return this.taskService.findAll();
  }

  @Post()
  @Permissions('create_task')
  createTask(@Body() data: Partial<Task>) {
  console.log('POST /tasks called');  
  return this.taskService.create(data);
  }

  @Put(':id')
  @Permissions('update_task')
  updateTask(@Param('id') id: string, @Body() data: Partial<Task>) {
  console.log('PUT /tasks called');  
  return this.taskService.update(+id, data);
  }

  @Delete(':id')
  @Permissions('delete_task')
  deleteTask(@Param('id') id: string) {
  console.log('DELETE /tasks called');  
  return this.taskService.delete(+id);
  }
}