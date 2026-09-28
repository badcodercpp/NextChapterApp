import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',

  documents: ['src/**/*.{ts,tsx}', '!src/__generated__/**'],

  generates: {
    './src/__generated__/graphql.ts': {
      plugins: ['typescript-operations', 'typescript-rtk-query'],

      config: {
        importBaseApiFrom: '@/api/baseApi',
        exportHooks: true,

        documentMode: 'string',

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
