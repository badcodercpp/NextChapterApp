import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';

import { ZodError } from 'zod';

interface MapZodErrorsArgs<TFieldValues extends FieldValues> {
  /** The Zod safeParse error result */
  error: ZodError;
  /** The React Hook Form setError function */
  setError: UseFormSetError<TFieldValues>;
  /** The React Hook Form clearErrors function */
  clearErrors: UseFormClearErrors<TFieldValues>;
  /** The root namespace key of your form layout (e.g., 'login', 'createAccount') */
  parentKey: Path<TFieldValues>;
}

/**
 * Automatically maps Zod validation errors to deeply nested React Hook Form fields
 */
export const mapZodErrorsToForm = <TFieldValues extends FieldValues>({
  error,
  setError,
  clearErrors,
  parentKey,
}: MapZodErrorsArgs<TFieldValues>): void => {
  // 1. Clear any existing errors in this namespace to start fresh
  clearErrors(parentKey);

  // 2. Loop through Zod issues and assign them to React Hook Form
  error.issues.forEach(issue => {
    const fieldKey = issue.path?.[0];

    if (fieldKey !== undefined) {
      // Safely construct the exact field path string (e.g., "login.email")
      const fullFieldName = `${String(parentKey)}.${String(fieldKey)}`;

      setError(fullFieldName as any, {
        type: 'manual',
        message: issue.message,
      });
    }
  });
};
