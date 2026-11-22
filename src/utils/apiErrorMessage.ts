export const getApiErrorMessage = (error: unknown): string => {
  const apiError = error as {
    message?: string;
    data?: {
      errors?: Array<{ message?: string }>;
      message?: string;
    };
    error?: string;
  };

  // GraphQL errors directly available in data
  const graphQLError = apiError?.data?.errors?.[0]?.message;

  if (graphQLError) {
    return graphQLError;
  }

  // RTK Query error message
  const message = apiError?.message;

  if (message) {
    // Remove serialized GraphQL response and stack details
    return message.split(/:\s*\{\\?"response"/)[0].trim();
  }

  return apiError?.data?.message || apiError?.error || 'Something went wrong.';
};
