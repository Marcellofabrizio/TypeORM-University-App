import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";

import { User } from "./User";
import { Class } from "./Class";
import { Course } from "./Course";

@Entity()
export class Student extends User {
  @ManyToMany(() => Class, (cls) => cls.students)
  classes: Class[];

  @ManyToOne(type => Course, course => course.students)
  course: Course;
}
