import { GraphQLList, GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentRepository } from "../../../repositories/Document";
import { DocumentFragmentRepository } from "../../../repositories/DocumentFragment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { DocumentFragment } from "../../DocumentFragment";
import { DocumentFragmentChildrenWhereInput } from "../../DocumentFragmentChildrenWhereInput";
import { PageInt } from "../../PageInt";
import { PerPageInt } from "../../PerPageInt";

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
      type: DocumentFragmentChildrenWhereInput
    }
  },
  async resolve(parent, args, context, info) {
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
    const docuemtnFragmentList = await context.loaders.query.load<DocumentFragmentRepository>({ query, parameterList, isArray: true });
    docuemtnFragmentList.forEach(fragment => context.loaders.documentFragment.prime(fragment.id, fragment));
    return docuemtnFragmentList;
  }
});
