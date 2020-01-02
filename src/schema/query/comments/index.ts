import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Comment } from "../../Comment";
import { CommentWhereInput } from "../../CommentWhereInput";
import { PageInt } from "../../PageInt";
import { PerPageInt } from "../../PerPageInt";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const comments = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Comment))),
  args: {
    page: {
      type: PageInt,
      defaultValue: 0
    },
    perPage: {
      type: PerPageInt,
      defaultValue: 20
    },
    where: {
      type: new GraphQLNonNull(CommentWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Comment.*")
      .from(CommentRepository, "Comment")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    const commentList = await context.loaders.query.load<CommentRepository>({ query, parameterList, isArray: true });
    commentList.forEach(comment => context.loaders.comment.prime(comment.id, comment));
    return commentList;
  }
});
