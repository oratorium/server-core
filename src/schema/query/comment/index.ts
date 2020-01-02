import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Comment } from "../../Comment";
import { CommentWhereInput } from "./CommentWhereInput";

export const comment = createField({
  type: Comment,
  args: {
    where: {
      type: new GraphQLNonNull(CommentWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Comment.*")
      .from(CommentRepository, "Comment")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    const comment = await context.loaders.query.load<CommentRepository>({ query, parameterList });
    if (comment) {
      context.loaders.comment.prime(comment.id, comment);
    }
    return comment;
  }
});
