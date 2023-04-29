import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column,  
	ManyToMany,
    JoinTable, 
} from "typeorm";

import {
	Class
} from "./Class";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    academicSequence: string

	@ManyToMany(() => Class)
	@JoinTable()
	classes: Class[]

}
	