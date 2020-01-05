import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["userId", "imagePath"])
@Entity({ name: "UserAvatar" })
export class UserAvatarRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  userId!: number;

  @Column({ type: "boolean", default: false })
  isDefault!: string;

  @Column({ type: "varchar", length: 64 })
  extension!: string;

  @Column({ type: "tinytext" })
  imagePath!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
