import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

type Payload = {
  user: {
    id: number;
  };
};

@Unique(["mentionId"])
@Entity({ name: "User" })
export class UserRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  mentionId!: string;

  @Column({ type: "varchar", length: 64 })
  displayName!: string;

  @Column({ type: "boolean", default: false })
  isAuthorized!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  static createToken(payload: Payload): string {
    return "token";
  }

  static parseToken(token: string): null | Payload {
    return null;
  }
}
