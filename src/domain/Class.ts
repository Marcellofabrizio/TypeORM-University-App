import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Student } from "./Student";
@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  credits: number;

  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable()
  students: Student[];
}
