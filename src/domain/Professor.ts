import { Entity, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class Professor extends User {
    @Column()
    speciality: string;
}
