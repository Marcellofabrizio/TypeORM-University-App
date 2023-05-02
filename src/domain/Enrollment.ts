import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn,
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
    @JoinColumn({
        name: 'studentId'
    })
    student: Student;

    @ManyToOne(() => Course, course => course)
    course: Course;

    @ManyToMany(() => Class, cls => cls)
    classes: Class[];

}