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
import { Enrollment } from "./Enrollment";

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

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
    enrollments: Enrollment[];
}
