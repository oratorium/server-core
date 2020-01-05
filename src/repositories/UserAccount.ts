import crypto from "crypto";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

const ITERATION = 1000;
const LENGTH = 64;
const BYTE_LENGTH = 0.5 * LENGTH;
const ALGORITHME = "sha512";
const ENCODING = "hex";

@Unique(["email"])
@Entity({ name: "UserAccount" })
export class UserAccountRepository {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id!: number;

  @Column({ type: "bigint", unsigned: true })
  userId!: number;

  @Column({ type: "varchar", length: 64 })
  email!: string;

  @Column({ type: "char", length: 64 })
  salt!: string;

  @Column({ type: "char", length: 64 })
  password!: string;

  @Column({ type: "boolean", default: false })
  isAuthorized!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  static createSalt() {
    return crypto.randomBytes(BYTE_LENGTH).toString(ENCODING);
  }

  static async hashPassword(password: string, salt: string) {
    return new Promise<string>(resolve => {
      crypto.pbkdf2(password, salt, ITERATION, BYTE_LENGTH, ALGORITHME, (error, derivedKey) => {
        resolve(derivedKey.toString(ENCODING));
      });
    });
  }
}
