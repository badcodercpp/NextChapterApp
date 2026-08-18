import { BaseGraphQLAccessor, INITIATE_LOGIN } from '@/graphql-communicator';
import { LoginMutation, LoginMutationVariables } from '@/__generated__/graphql';

export class LoginAccessor extends BaseGraphQLAccessor<
  LoginMutationVariables,
  LoginMutation
> {
  async execute(variables: LoginMutationVariables) {
    const graphqlGuardedClient = await this.getGuardedClient();

    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_LOGIN,
      variables,
    });
    return response;
  }
}
