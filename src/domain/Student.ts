import {
    Entity,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    JoinColumn,
    OneToOne,
} from "typeorm";

import { User } from "./User";
import { Class } from "./Class";
import { Course } from "./Course";
import { Enrollment } from "./Enrollment";

@Entity()
export class Student extends User {

    @OneToOne(() => Enrollment, enrollment => enrollment.student)
    @JoinColumn()
    enrollment: Enrollment

    @ManyToMany(() => Class, (cls) => cls.students)
    classes: Class[];
}
