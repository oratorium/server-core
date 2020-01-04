import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { createBracket, createField, load } from "../../../utils/graphql-helper";
import { Document } from "../../Document";
import { DocumentWhereInput } from "./DocumentWhereInput";

export const document = createField({
  type: Document,
  args: {
    where: {
      type: new GraphQLNonNull(DocumentWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("Document.*")
      .from(DocumentRepository, "Document")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    return load<DocumentRepository>(query, parameterList);
  }
});
