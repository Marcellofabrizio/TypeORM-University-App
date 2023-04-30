import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";

import { Class } from "./Class";
import { Student } from "./Student";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    academicSequence: string;

    @ManyToMany(() => Class)
    @JoinTable()
    classes: Class[];

    @OneToMany(() => Student, (student) => student.course)
    students: Student[];
}
