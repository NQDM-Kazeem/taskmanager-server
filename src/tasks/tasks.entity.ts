import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

// An entity is always a class
@Entity() //decorator factory;
export class Task {
  @PrimaryGeneratedColumn('uuid') //property decorators
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'enum', enum: Priority, default: Priority.NORMAL })
  priority: Priority;

  @Column({ type: 'enum', enum: Status, default: Status.TODO })
  status: Status;
}
