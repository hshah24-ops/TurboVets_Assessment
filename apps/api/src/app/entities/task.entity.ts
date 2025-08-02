import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => User, user => user.id)
  owner!: User;

  @ManyToOne(() => Organization, org => org.id)
  organization!: Organization;
}