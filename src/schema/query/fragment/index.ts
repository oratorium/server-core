import { GraphQLNonNull } from "graphql";
import { getConnection } from "typeorm";

import { DocumentFragmentRepository } from "../../../repositories/DocumentFragment";
import { createBracket, createField } from "../../../utils/graphql-helper";
import { DocumentFragment } from "../../DocumentFragment";
import { DocumentWhereInput } from "../../DocumentWhereInput";

export const fragment = createField({
  type: DocumentFragment,
  args: {
    where: {
      type: new GraphQLNonNull(DocumentWhereInput)
    }
  },
  async resolve(parent, args, context, info) {
    const [query, parameterList] = getConnection()
      .createQueryBuilder()
      .select("DocumentFragment.*")
      .from(DocumentFragmentRepository, "DocumentFragment")
      .where(createBracket(args.where))
      .limit(1)
      .getQueryAndParameters();
    const documentFragment = await context.loaders.query.load<DocumentFragmentRepository>({ query, parameterList });
    if (documentFragment) {
      context.loaders.documentFragment.prime(documentFragment.id, documentFragment);
    }
    return documentFragment;
  }
});
