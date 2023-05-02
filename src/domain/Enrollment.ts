import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    OneToOne,
} from "typeorm";

import { Student } from "./Student";
import { Class } from "./Class";
import { Course} from "./Course";

@Entity()
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    semester: number;

    @OneToOne(() => Student, student => student.enrollment)
    student: Student;

    @ManyToOne(() => Course, course => course)
    course: Course;

    @ManyToMany(() => Class, cls => cls)
    @JoinTable()
    classes: Class[];

}