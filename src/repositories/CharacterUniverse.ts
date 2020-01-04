import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "CharacterUniverse" })
export class CharacterUniverseRepository {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  characterId!: number;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  universeId!: number;
}
