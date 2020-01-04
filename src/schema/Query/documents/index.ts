import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { createBracket, createField, loadMany } from "../../../utils/graphql-helper";
import { Document } from "../../Document";
import { Page, PerPage } from "../../Scalars";
import { DocumentsWhereInput } from "./DocumentsWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const documents = createField<any, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Document))),
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
      type: new GraphQLNonNull(DocumentsWhereInput)
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("Document.*")
      .from(DocumentRepository, "Document")
      .where(createBracket(args.where))
      .offset(args.page * args.perPage)
      .limit(args.perPage);
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return loadMany<DocumentRepository>(query, parameterList);
  }
});
