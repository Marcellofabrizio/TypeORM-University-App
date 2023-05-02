import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    JoinColumn,
    ManyToOne,
} from "typeorm";

import { Student } from "./Student";
import { Professor } from "./Professor";
import { Enrollment } from "./Enrollment";

@Entity()
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    credits: number;

    @ManyToOne(() => Professor, (professor) => professor)
    professor: Professor;

    @ManyToMany(() => Enrollment, (enrollment) => enrollment.classes)
    @JoinTable()
    enrollments: Enrollment[];
}
