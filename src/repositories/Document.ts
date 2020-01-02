import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Document" })
export class DocumentRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  name!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
