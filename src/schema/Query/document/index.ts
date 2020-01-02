import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { Document } from "../../Document";
import { DocumentWhereInput } from "./DocumentWhereInput";

export const document = createField({
  type: Document,
  args: {
    where: {
      type: new GraphQLNonNull(DocumentWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Document.*")
      .from(DocumentRepository, "Document")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    const document = await context.loaders.query.load<DocumentRepository>({ query, parameterList });
    if (document) {
      context.loaders.document.prime(document.id, document);
    }
    return document;
  }
});
