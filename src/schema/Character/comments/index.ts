import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getConnection } from "typeorm";

import { CharacterRepository } from "../../../repositories/Character";
import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Page, PerPage } from "../../Scalars";
import { CommentsOnCharacterWhereInput } from "./CommentsOnCharacterWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const comments = (Comment: GraphQLObjectType) =>
  createField<CharacterRepository, Args>({
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
        type: CommentsOnCharacterWhereInput
      }
    },
    resolve(parent, args, context, info) {
      const queryBuilder = getConnection()
        .createQueryBuilder()
        .select("Comment.*")
        .from(CommentRepository, "Comment")
        .where("Comment.characterId = :characterId", { characterId: parent.id })
        .limit(args.perPage)
        .offset(args.page * args.perPage);
      if (args.where) {
        queryBuilder.andWhere(createBracket(args.where));
      }
      const [query, parameterList] = queryBuilder.getQueryAndParameters();
      return loadMany<CommentRepository>(query, parameterList);
    }
  });
