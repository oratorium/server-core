import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Kind" })
export class KindRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", nullable: true })
  parentId!: null | number;

  @Column({ type: "varchar", length: 64 })
  name!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
