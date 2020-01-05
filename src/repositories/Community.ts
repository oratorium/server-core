import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["path"])
@Entity({ name: "Community" })
export class CommunityRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  path!: string;

  @Column({ type: "varchar" })
  displayName!: string;

  @Column({ type: "tinytext" })
  description!: string;

  @Column({ type: "boolean", default: true })
  isPublic!: boolean;

  @Column({ type: "tinytext" })
  ageRestriction!: number;

  @Column({ type: "varchar", length: 64 })
  assignmentType!: string;

  @Column({ type: "tinyint" })
  creationLevel!: number;

  @Column({ type: "varchar", length: 64 })
  personality!: string;

  @Column({ type: "char", length: 7 })
  themeColor!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
