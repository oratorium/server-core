import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Token" })
export class TokenRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bool", default: false })
  isConsumed!: boolean;

  @Column({ type: "varchar", length: 64 })
  type!: string;

  @Column({ type: "tinytext" })
  value!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
