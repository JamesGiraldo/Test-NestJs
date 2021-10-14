import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { type: "varchar", length: 100, nullable: false })
    name: string;

    @Column( { type: "float", nullable: false })
    price: number;
}