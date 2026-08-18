import { BaseGraphQLAccessor, INITIATE_REGISTER } from '@/graphql-communicator';
import {
  RegisterMutation,
  RegisterMutationVariables,
} from '@/__generated__/graphql';

export class RegisterAccessor extends BaseGraphQLAccessor<
  RegisterMutationVariables,
  RegisterMutation
> {
  async execute(variables: RegisterMutationVariables) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_REGISTER,
      variables,
    });
    return response;
  }
}
