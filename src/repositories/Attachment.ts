import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Attachment" })
export class AttachmentRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  commentId!: number;

  @Column({ type: "varchar", length: 64 })
  type!: string;

  @Column({ type: "tinytext" })
  value!: string;
}
