import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { AttachmentRepository } from "../../../repositories/Attachment";
import { CommentRepository } from "../../../repositories/Comment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Attachment } from "../../Attachment";
import { PageInt } from "../../Scalars/PageInt";
import { PerPageInt } from "../../Scalars/PerPageInt";
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
      type: PageInt,
      defaultValue: 0
    },
    perPage: {
      type: PerPageInt,
      defaultValue: 20
    },
    where: {
      type: AttachmentsOnCommentWhereInput
    }
  },
  async resolve(parent, args, context, info) {
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
    const attachmentList = await context.loaders.query.load<AttachmentRepository>({ query, parameterList, isArray: true });
    attachmentList.forEach(attachment => context.loaders.attachment.prime(attachment.id, attachment));
    return attachmentList;
  }
});
