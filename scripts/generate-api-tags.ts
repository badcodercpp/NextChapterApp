import fs from 'node:fs';
import path from 'node:path';

const generatedFile = path.resolve(
  process.cwd(),
  'src/__generated__/graphql.ts',
);

const outputFile = path.resolve(process.cwd(), 'src/api/apiTags.ts');

const source = fs.readFileSync(generatedFile, 'utf8');

// Match:
// SomeEndpoint: build.query<...
// SomeEndpoint: build.mutation<...
const endpointRegex = /^\s{4}(\w+): build\.(query|mutation)</gm;

const endpoints: Array<{
  name: string;
  type: 'query' | 'mutation';
}> = [];

let match: RegExpExecArray | null;

while ((match = endpointRegex.exec(source)) !== null) {
  endpoints.push({
    name: match[1],
    type: match[2] as 'query' | 'mutation',
  });
}

// Only these rules contain product/business knowledge.
// Everything else is generated automatically.
const invalidationRules: Record<string, string[]> = {
  UpdateProfile: ['Me'],

  StartJourney: ['Journey', 'Question'],

  PauseJourney: ['Journey'],

  ResumeJourney: ['Journey'],

  CompleteJourney: ['Journey', 'Question'],

  FollowUp: ['Question'],
};

// Domain tags.
//
// These are intentionally separate from endpoint names.
// Multiple endpoints can represent the same resource.
const tagRules: Record<string, string> = {
  Me: 'Me',

  ActiveJourney: 'Journey',

  TodayQuestion: 'Question',

  GetRecoveryReason: 'Recovery',

  GetRecoveryTimeline: 'Recovery',

  GetRecoveryFeeling: 'Recovery',

  GetRecoveryGoal: 'Recovery',
};

const queryEndpoints = endpoints.filter(endpoint => endpoint.type === 'query');

const mutationEndpoints = endpoints.filter(
  endpoint => endpoint.type === 'mutation',
);

const tagTypes = Array.from(
  new Set([
    ...Object.values(tagRules),
    ...Object.values(invalidationRules).flat(),
  ]),
).sort();

const lines: string[] = [];

lines.push(`import { api } from './baseApi';`);
lines.push('');
lines.push(`export const enhancedApi = api.enhanceEndpoints({`);

lines.push(`  addTagTypes: [`);
for (const tag of tagTypes) {
  lines.push(`    '${tag}',`);
}
lines.push(`  ],`);

lines.push('');
lines.push(`  endpoints: {`);

// -----------------------------
// Query providesTags
// -----------------------------

for (const endpoint of queryEndpoints) {
  const tag = tagRules[endpoint.name];

  if (!tag) {
    continue;
  }

  lines.push(`    ${endpoint.name}: {`);
  lines.push(`      providesTags: ['${tag}'],`);
  lines.push(`    },`);
}

// -----------------------------
// Mutation invalidatesTags
// -----------------------------

for (const endpoint of mutationEndpoints) {
  const tags = invalidationRules[endpoint.name];

  if (!tags?.length) {
    continue;
  }

  lines.push(`    ${endpoint.name}: {`);
  lines.push(
    `      invalidatesTags: [${tags.map(tag => `'${tag}'`).join(', ')}],`,
  );
  lines.push(`    },`);
}

lines.push(`  },`);
lines.push(`});`);
lines.push('');

fs.mkdirSync(path.dirname(outputFile), {
  recursive: true,
});

fs.writeFileSync(outputFile, lines.join('\n'), 'utf8');

console.log(`Generated API tags for ${endpoints.length} endpoints.`);

console.log(`Queries: ${queryEndpoints.length}`);

console.log(`Mutations: ${mutationEndpoints.length}`);

console.log(`Output: ${path.relative(process.cwd(), outputFile)}`);
