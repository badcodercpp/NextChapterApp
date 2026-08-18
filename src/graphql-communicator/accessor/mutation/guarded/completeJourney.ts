import {
  BaseGraphQLAccessor,
  INITIATE_COMPLETE_JOURNEY,
} from '@/graphql-communicator';
import {
  CompleteJourneyMutation,
  CompleteJourneyMutationVariables,
} from '@/__generated__/graphql';

export class CompleteJourneyAccessor extends BaseGraphQLAccessor<
  CompleteJourneyMutationVariables,
  CompleteJourneyMutation
> {
  async execute(variables: CompleteJourneyMutationVariables) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_COMPLETE_JOURNEY,
      variables,
    });
    return response;
  }
}
