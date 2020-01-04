import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique(["kind", "displayName"])
@Entity({ name: "Hashtag" })
export class HashtagRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  kind!: string;

  @Column({ type: "varchar", length: 64 })
  displayName!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
