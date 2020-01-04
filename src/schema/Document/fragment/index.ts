import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { DocumentFragmentRepository } from "../../../repositories/DocumentFragment";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { DocumentFragment } from "../../DocumentFragment";
import { DocumentFragmentOnDocumentWhereInput } from "./DocumentFragmentOnDocumentWhereInput";

export const fragment = createField<DocumentRepository>({
  type: DocumentFragment,
  args: {
    where: {
      type: DocumentFragmentOnDocumentWhereInput
    }
  },
  resolve(parent, args, context, info) {
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
    return load<DocumentFragmentRepository>(query, parameterList);
  }
});
