import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',

  documents: ['!src/__generated__/**', 'src/**/*.gql'],

  generates: {
    './src/__generated__/graphql.ts': {
      plugins: ['typescript-operations', 'typescript-rtk-query'],

      config: {
        importBaseApiFrom: '@/api/baseApi',
        exportHooks: true,

        documentMode: 'documentNode',

        useTypeImports: true,
        dedupeFragments: true,
        skipTypename: false,

        // Native TS enums
        enumType: 'native',
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
