import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RolEntity } from './../rol/rol.entity';

@Entity({ name: "user" })
export class Userentity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password: string;

    @ManyToMany(type => RolEntity, rol => rol.users, { eager: true, cascade: true  } )
    @JoinTable( {
        name: "user_rol",
        joinColumn: { name: "user_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "rol_id", referencedColumnName: "id" }
    })
    roles: RolEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<string> {
        if (!this.password)  return;
        /** Encriptar password */
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hashSync(this.password, salt);
        return await this.password;
    }
}