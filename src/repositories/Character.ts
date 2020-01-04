import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Character" })
export class CharacterRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  userId!: number;

  @Column({ type: "varchar", length: 64 })
  displayName!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
