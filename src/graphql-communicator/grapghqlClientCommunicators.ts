import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';

import { GRAPHQL_CONFIG } from '@/constants';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
//@ts-ignore
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { map } from 'rxjs';
import { setContext } from '@apollo/client/link/context';
import { store } from '@/state';

export class ClientCommunicators {
  static #instance: ClientCommunicators;

  private constructor() {}

  public static get instance(): ClientCommunicators {
    if (!ClientCommunicators.#instance) {
      ClientCommunicators.#instance = new ClientCommunicators();
    }

    return ClientCommunicators.#instance;
  }

  public getAuthenticatedClient() {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: `${GRAPHQL_CONFIG.WS_ENDPOINT}/${GRAPHQL_CONFIG.URL}`,

        retryAttempts: Infinity,

        shouldRetry: () => true,

        connectionParams: async () => {
          const {
            authtokenSlice: { accessToken },
          } = store.getState();

          const token = accessToken || '';

          console.log(
            'Connecting with accessToken:',
            accessToken,
            JSON.stringify(store.getState().authtokenSlice),
          );

          return {
            Authorization: token ? `Bearer ${token}` : '',
          };
        },
      }),
    );

    /**
     * GraphQL logging link
     */
    const loggingLink = new ApolloLink((operation, forward) => {
      // Log GraphQL request
      // @ts-ignore
      console.tron.log('GraphQL Request:', operation);

      const observable = forward(operation);

      return observable.pipe(
        map(response => {
          // Log GraphQL response
          // @ts-ignore
          console.tron.log('GraphQL Response:', response);

          return response;
        }),
      );
    });

    /**
     * Authentication link
     */
    const authLink = setContext(async (_, { headers }) => {
      const {
        authtokenSlice: { accessToken },
      } = store.getState();

      const token = accessToken || '';

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    /**
     * Upload / HTTP link
     */
    const uploadLink = createUploadLink({
      uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,

      headers: {
        'apollo-require-preflight': 'true',
      },
    });

    /**
     * Subscription → WebSocket
     * Query/Mutation → HTTP
     */
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);

        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },

      wsLink,

      uploadLink,
    );

    /**
     * Authenticated Apollo Client
     */
    return new ApolloClient({
      link: ApolloLink.from([loggingLink, authLink, splitLink]),

      cache: new InMemoryCache(),
    });
  }

  public getClient() {
    const uploadLink = createUploadLink({
      uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,

      headers: {
        'apollo-require-preflight': 'true',
      },
    });

    return new ApolloClient({
      cache: new InMemoryCache(),

      link: uploadLink,
    });
  }
}
