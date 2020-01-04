import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Universe" })
export class UniverseRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  displayName!: string;

  @Column({ type: "tinytext" })
  description!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
