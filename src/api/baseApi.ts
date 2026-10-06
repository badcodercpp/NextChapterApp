import type { BaseQueryApi } from '@reduxjs/toolkit/query';
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

interface GraphQLArgs {
  document: string;
  variables?: Record<string, unknown> | void;
}

const GRAPHQL_URL = 'http://localhost:3000/graphql';

const client = new GraphQLClient(GRAPHQL_URL);

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
});

const isReactNativeFile = (value: unknown): boolean => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return 'uri' in value && typeof (value as { uri?: unknown }).uri === 'string';
};

const containsFile = (value: unknown): boolean => {
  if (isReactNativeFile(value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(containsFile);
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(containsFile);
  }

  return false;
};

const setNullForFiles = (value: unknown): unknown => {
  if (isReactNativeFile(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map(setNullForFiles);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        setNullForFiles(child),
      ]),
    );
  }

  return value;
};

const findFiles = (
  value: unknown,
  path: string,
  files: Array<{
    path: string;
    file: any;
  }>,
): void => {
  if (isReactNativeFile(value)) {
    files.push({
      path,
      file: value,
    });

    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      findFiles(item, `${path}.${index}`, files);
    });

    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => {
      findFiles(child, `${path}.${key}`, files);
    });
  }
};

const uploadBaseQuery = async (
  args: GraphQLArgs,
  baseQueryApi: BaseQueryApi,
  extraOptions: {},
) => {
  const state = baseQueryApi.getState() as BaseApiState;

  const accessToken = state.app.authtoken.accessToken;

  /*
   * NORMAL GRAPHQL
   */
  if (!containsFile(args.variables)) {
    if (accessToken) {
      client.setHeader('Authorization', `Bearer ${accessToken}`);
    } else {
      client.requestConfig.headers = {};
    }

    return graphqlBaseQuery(args, baseQueryApi, extraOptions);
  }

  /*
   * GRAPHQL MULTIPART UPLOAD
   */
  try {
    const files: Array<{
      path: string;
      file: any;
    }> = [];

    findFiles(args.variables, 'variables', files);

    const variables = setNullForFiles(args.variables);

    const map: Record<string, string[]> = {};

    files.forEach((item, index) => {
      map[String(index)] = [item.path];
    });

    const formData = new FormData();

    formData.append(
      'operations',
      JSON.stringify({
        query: args.document,
        variables,
      }),
    );

    formData.append('map', JSON.stringify(map));

    files.forEach((item, index) => {
      const file = item.file;

      formData.append(String(index), {
        uri: file.uri,
        type: file.type ?? 'application/octet-stream',
        name: file.name ?? file.fileName ?? `upload-${index}`,
      } as any);
    });

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        ...(accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
              'Apollo-Require-Preflight': 'true',
            }
          : {}),
      },
      body: formData,
    });

    const result = await response.json();

    if (result.errors?.length) {
      return {
        error: {
          status: response.status,
          data: result.errors,
        },
      };
    }

    return {
      data: result.data,
    };
  } catch (error) {
    return {
      error: {
        status: 'FETCH_ERROR',
        error: error instanceof Error ? error.message : 'GraphQL upload failed',
      },
    };
  }
};

export const api = createApi({
  reducerPath: 'api',

  tagTypes: ['Me', 'Journey', 'Question', 'Recovery'],

  baseQuery: uploadBaseQuery,

  endpoints: () => ({}),
});
