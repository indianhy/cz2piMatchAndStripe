import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    identifier:string

    @Column()
    otp:string

    @Column()
    recovery_code:string

    @Column()
    first_name:string

    @Column()
    last_name:string

    @Column()
    department:string

    @Column()
    location:string

    @Column()
    country:string

    @Column()
    planet:string    

}