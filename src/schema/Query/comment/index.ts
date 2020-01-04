import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Comment } from "../../Comment";
import { CommentWhereInput } from "./CommentWhereInput";

export const comment = createField({
  type: Comment,
  args: {
    where: {
      type: new GraphQLNonNull(CommentWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Comment.*")
      .from(CommentRepository, "Comment")
      .where("Comment.deletedAt IS NULL")
      .andWhere(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<CommentRepository>(query, parameterList);
  }
});
