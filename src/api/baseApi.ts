import { GraphQLClient } from 'graphql-request';
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

interface AuthState {
  accessToken?: string | null;
}

interface BaseApiState {
  app: {
    authtoken: AuthState;
  };
}

const client = new GraphQLClient('http://localhost:3000/graphql');

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
});

export const api = createApi({
  reducerPath: 'api',

  tagTypes: ['Me', 'Journey', 'Question', 'Recovery'],

  baseQuery: async (args, baseQueryApi, extraOptions) => {
    const state = baseQueryApi.getState() as BaseApiState;

    const accessToken = state.app.authtoken.accessToken;

    console.log('GRAPHQL REQUEST TOKEN:', accessToken);

    if (accessToken) {
      client.setHeader('Authorization', `Bearer ${accessToken}`);
    } else {
      client.requestConfig.headers = {};
    }

    return graphqlBaseQuery(args, baseQueryApi, extraOptions);
  },

  endpoints: () => ({}),
});
