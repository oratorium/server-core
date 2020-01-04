import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Comment" })
export class CommentRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  userId!: number;

  @Column({ type: "bigint", unsigned: true })
  characterId!: number;

  @Column({ type: "bigint", unsigned: true, nullable: true })
  parentId!: null | number;

  @Column({ type: "int", unsigned: true })
  depth!: number;

  @Column({ type: "int", unsigned: true })
  order!: number;

  @Column({ type: "tinytext" })
  text!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @Column({ type: "datetime", nullable: true })
  deletedAt!: null | Date;
}
