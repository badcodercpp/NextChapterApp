import { BaseGraphQLAccessor, ExactType } from '@/graphql-communicator';

import { TypedDocumentNode } from '@apollo/client';

export class GuardedMutationAccessor<
  TVariables extends { [key: string]: unknown },
  TData,
> extends BaseGraphQLAccessor<TVariables, TData> {
  async execute(
    variables: TVariables,
    targetGraphQL: TypedDocumentNode<TData, ExactType<TVariables>>,
  ) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: targetGraphQL,
      variables,
    });
    return response;
  }
}
