import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "CharacterInformation" })
export class CharacterInformationRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  characterId!: number;

  @Column({ type: "varchar", length: 64 })
  name!: string;

  @Column({ type: "varchar", length: 64 })
  type!: string;

  @Column({ type: "tinytext" })
  value!: string;
}
