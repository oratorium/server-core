import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { loadMany } from "../../../utils/graphql-helper";
import { PageInt } from "../../Scalars/PageInt";
import { PerPageInt } from "../../Scalars/PerPageInt";
import { CommentsOnCommentWhereInput } from "./CommentsOnCommentWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const comments = (Comment: GraphQLObjectType) =>
  createField<CommentRepository, Args>({
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
        type: CommentsOnCommentWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("Comment.*")
        .from(CommentRepository, "Comment")
        .where("parentId = :parentId", { parentId: parent.id })
        .limit(args.perPage)
        .offset(args.page * args.perPage);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return loadMany<CommentRepository>(query, parameterList);
    }
  });
