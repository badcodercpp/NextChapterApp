import { ApolloClient } from '@apollo/client';
import { ClientCommunicators } from '@/graphql-communicator';
import { ExecutionResult } from 'graphql';

/**
 * Abstract base class for executing typed GraphQL queries and mutations.
 * @template TVariables Shape of the input variables required by the GraphQL operation
 * @template TData Expected shape of the response payload
 */
export abstract class BaseGraphQLAccessor<TVariables, TData> {
  /**
   * Retrieves the authenticated Apollo Client instance.
   */
  protected async getGuardedClient(): Promise<ApolloClient> {
    return await ClientCommunicators.instance.getAuthenticatedClient();
  }

  /**
   * Executes the GraphQL operation with the given variables.
   * @param variables Input parameters required by the GraphQL operation
   */
  abstract execute(variables: TVariables): Promise<ExecutionResult<TData>>;
}
