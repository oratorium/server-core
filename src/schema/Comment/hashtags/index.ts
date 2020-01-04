import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { CommentRepository } from "../../../repositories/Comment";
import { CommentHashtagRepository } from "../../../repositories/CommentHashtag";
import { HashtagRepository } from "../../../repositories/Hashtag";
import { createField, loadMany } from "../../../utils/graphql-helper";
import { Hashtag } from "../../Hashtag";
import { PageInt, PerPageInt } from "../../Scalars";

type Args = {
  page: number;
  perPage: number;
};

export const hashtags = createField<CommentRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Hashtag))),
  args: {
    page: {
      type: PageInt,
      defaultValue: 0
    },
    perPage: {
      type: PerPageInt,
      defaultValue: 20
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Hashtag.*")
      .from(HashtagRepository, "Hashtag")
      .innerJoin(CommentHashtagRepository, "CommentHashtag", "CommentHashtag.commentId = :commentId", { commentId: parent.id })
      .where("Hashtag.id = CommentHashtag.hashtagId")
      .andWhere("Hashtag.kind = 'Comment'")
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<CommentRepository>(query, parameterList);
  }
});
