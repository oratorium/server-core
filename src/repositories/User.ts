import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export class UserRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  displayName!: string;
}
