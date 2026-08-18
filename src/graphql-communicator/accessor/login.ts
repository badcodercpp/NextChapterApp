import { ClientCommunicators } from '@/graphql-communicator/grapghqlClientCommunicators';
import { INITIATE_LOGIN } from '@/graphql-communicator/mutation/open';
import { LoginMutationVariables } from '@/__generated__/graphql';
// console.log('graphqlGuardedClient', ClientCommunicators);

export class LoginAccessor {
  async initiateLogin(variables: LoginMutationVariables) {
    const graphqlGuardedClient =
      await ClientCommunicators.instance.getAuthenticatedClient();
    console.log(
      'graphqlGuardedClient',
      ClientCommunicators,
      graphqlGuardedClient,
    );
    const response = await graphqlGuardedClient.mutate({
      mutation: INITIATE_LOGIN,
      variables,
    });
    return response;
  }
}
