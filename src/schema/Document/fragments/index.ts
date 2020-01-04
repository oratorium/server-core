import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { DocumentFragmentRepository } from "../../../repositories/DocumentFragment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { load } from "../../../utils/graphql-helper";
import { DocumentFragment } from "../../DocumentFragment";
import { PageInt, PerPageInt } from "../../Scalars";
import { DocumentFragmentsOnDocumentWhereInput } from "./DocumentFragmentsOnDocumentWhereInput";

type Args = {
  page: number;
  perPage: number;
  where: any;
};

export const fragments = createField<DocumentRepository, Args>({
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DocumentFragment))),
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
      type: DocumentFragmentsOnDocumentWhereInput
    }
  },
  resolve(parent, args, context, info) {
    const queryBuilder = getConnection()
      .createQueryBuilder()
      .select("DocumentFragment.*")
      .from(DocumentFragmentRepository, "DocumentFragment")
      .where("documentId = :documentId", { documentId: parent.id })
      .limit(args.perPage)
      .offset(args.page * args.perPage);
    if (args.where) {
      queryBuilder.andWhere(createBracket(args.where));
    }
    const [query, parameterList] = queryBuilder.getQueryAndParameters();
    return load<DocumentFragmentRepository>(query, parameterList);
  }
});
