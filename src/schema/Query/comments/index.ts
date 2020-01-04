import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Comment } from "../../Comment";
import { Page, PerPage } from "../../Scalars";
import { CommentsWhereInput } from "./CommentsWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const comments = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Comment))),
  args: {
    page: {
      type: Page,
      defaultValue: 0
    },
    perPage: {
      type: PerPage,
      defaultValue: 20
    },
    where: {
      type: new GraphQLNonNull(CommentsWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Comment.*")
      .from(CommentRepository, "Comment")
      .where("Comment.deletedAt IS NULL")
      .andWhere(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<CommentRepository>(query, parameterList);
  }
});
