import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { DocumentFragmentRepository } from "../../../repositories/DocumentFragment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { DocumentFragment } from "../../DocumentFragment";
import { DocumentFragmentChildrenWhereInput } from "../../DocumentFragmentChildrenWhereInput";

export const fragment = createField<DocumentRepository>({
  type: DocumentFragment,
  args: {
    where: {
      type: DocumentFragmentChildrenWhereInput
    }
  },
  async resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("DocumentFragment.*")
      .from(DocumentFragmentRepository, "DocumentFragment")
      .where("documentId = :documentId", { documentId: parent.id })
      .limit(1);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    const documentFragment = await context.loaders.query.load<DocumentFragmentRepository>({ query, parameterList });
    if (documentFragment) {
      context.loaders.documentFragment.prime(documentFragment.id, documentFragment);
    }
    return documentFragment;
  }
});
