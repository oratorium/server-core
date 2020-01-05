import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "UserCommunity" })
export class UserCommunityRepository {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  userId!: number;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  communityId!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
