import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from "typeorm";

import { Student } from "./Student";
import { Professor } from "./Professor";

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

    @ManyToOne(() => Professor, (professor) => professor.classes)
    @JoinTable()
    professors: Professor;
}
