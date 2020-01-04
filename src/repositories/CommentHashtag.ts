import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "CommentHashtag" })
export class CommentHashtagRepository {
  @PrimaryColumn({ type: "bigint", unsigned: true })
  commentId!: number;

  @PrimaryColumn({ type: "bigint", unsigned: true })
  hashtagId!: number;
}
