import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';

import { GRAPHQL_CONFIG } from '../constants/graphql';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
//@ts-ignore
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { store } from '../state';

export class ClientAccessor {
  static #instance: ClientAccessor;

  private constructor() {}

  public static get instance(): ClientAccessor {
    if (!ClientAccessor.#instance) {
      ClientAccessor.#instance = new ClientAccessor();
    }

    return ClientAccessor.#instance;
  }

  public async getAuthenticatedClient() {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: `${GRAPHQL_CONFIG.WS_ENDPOINT}/${GRAPHQL_CONFIG.URL}`,
        retryAttempts: Infinity,
        shouldRetry: () => true,

        connectionParams: async () => {
          const {
            authtokenSlice: { accessToken },
          } = store.getState();

          console.log(
            'Connecting with accessToken:',
            accessToken,
            JSON.stringify(store.getState().authtokenSlice),
          );

          const token = accessToken || '';

          return {
            Authorization: token ? `Bearer ${token}` : '',
          };
        },
      }),
    );
    // const httpLink = createHttpLink({
    //   uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,
    // });
    // Create Apollo Link for logging
    const loggingLink = new ApolloLink((operation, forward) => {
      // Log the GraphQL request (Query/Mutation)
      //@ts-ignore
      console.tron.log('GraphQL Request:', operation);

      // Forward the operation to continue with the chain
      return forward(operation).map((response: any) => {
        // Log the GraphQL response
        //@ts-ignore
        console.tron.log('GraphQL Response:', response);
        return response;
      });
    });
    const authLink = setContext(async (_, { headers }) => {
      const {
        authtokenSlice: { accessToken },
      } = await store.getState();
      const token = accessToken || '';
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });
    const uploadLink = createUploadLink({
      uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,
      headers: {
        'apollo-require-preflight': 'true',
      },
      // isExtractableFile: customIsExtractableFile,
    });
    const splitLink = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === 'OperationDefinition' && def.operation === 'subscription'
        );
      },
      wsLink, // 🔥 subscriptions
      uploadLink, // queries & mutations
    );
    const graphqlGuardedClient = new ApolloClient({
      // link: authLink.concat(httpLink),
      // link: ApolloLink.from([loggingLink, authLink, uploadLink, httpLink]),
      link: ApolloLink.from([loggingLink, authLink, splitLink]),
      cache: new InMemoryCache(),
    });
    return graphqlGuardedClient;
  }

  public async getClient() {
    const graphqlOpenClient = new ApolloClient({
      // uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,
      cache: new InMemoryCache(),
      link: createUploadLink({
        uri: `${GRAPHQL_CONFIG.ENDPOINT}/${GRAPHQL_CONFIG.URL}`,
        headers: {
          'apollo-require-preflight': 'true',
        },
      }),
    });

    return graphqlOpenClient;
  }
}
