import { Entity, Column, OneToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Class } from "./Class";

@Entity()
export class Professor extends User {
    @Column()
    speciality: string;

    @OneToMany(() => Class, (cls) => cls)
    classes: Class[];
}
