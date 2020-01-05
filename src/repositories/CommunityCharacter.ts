import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "CommunityCharacter" })
export class CommunityCharacterRepository {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  communityId!: number;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  characterId!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
