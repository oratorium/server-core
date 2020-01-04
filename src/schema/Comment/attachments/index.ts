import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { AttachmentRepository } from "../../../repositories/Attachment";
import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Attachment } from "../../Attachment";
import { Page, PerPage } from "../../Scalars";
import { AttachmentsOnCommentWhereInput } from "./AttachmentsOnCommentWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const attachments = createField<CommentRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Attachment))),
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
      type: AttachmentsOnCommentWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Attachment.*")
      .from(AttachmentRepository, "Attachment")
      .where("commentId = :commentId", { commentId: parent.id })
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<AttachmentRepository>(query, parameterList);
  }
});
