import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Config" })
export class ConfigRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  kind!: string;

  @Column({ type: "varchar", length: 64 })
  key!: string;
}
