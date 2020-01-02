import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["documentId", "order"])
@Entity({ name: "DocumentFragment" })
export class DocumentFragmentRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  documentId!: number;

  @Column({ type: "bigint", unsigned: true })
  order!: number;

  @Column({ type: "varchar", length: 64 })
  type!: string;

  @Column({ type: "boolean", default: false })
  isOptional!: boolean;

  @Column({ type: "tinytext" })
  value!: string;
}
