import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Userentity } from './../user/user.entity';
import { RoleType } from "./rol.enum";

@Entity({ name: "rol" })
export class RolEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    roleName: RoleType;

    @ManyToMany(type => Userentity, user => user.roles)
    users: Userentity[];
}