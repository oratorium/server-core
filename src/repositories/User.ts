import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

type Payload = {
  user: {
    id: number;
  };
};

@Entity({ name: "User" })
export class UserRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 64 })
  email!: string;

  @Column({ type: "varchar", length: 64 })
  displayName!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  static createToken(payload: Payload): string {
    return "token";
  }

  static parseToken(token: string): null | Payload {
    return null;
  }
}
