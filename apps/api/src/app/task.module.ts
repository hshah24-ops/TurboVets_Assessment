import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuditLogModule } from './audit-log.module';
import { RoleModule } from './role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), 
  AuditLogModule,
  RoleModule,
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}