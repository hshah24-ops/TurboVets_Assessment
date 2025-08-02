import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string; // Owner, Admin, Viewer

  // Optionally add role inheritance info here if needed later

  @OneToMany(() => User, user => user.role)
  users!: User[];
}