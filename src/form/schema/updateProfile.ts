import * as z from 'zod';

import { Gender } from '@/__generated__/graphql';

export const updateProfileSchema = z.object({
  displayName: z
    .string('Display name is required')
    .min(2, 'Display name too short')
    .max(100, 'Display name too long'),
  bio: z.string().optional().nullable(),
  phone: z.string().max(15, 'Phone number too long').optional().nullable(),
  gender: z.enum(Gender).optional().nullable(),
  locationName: z.string().optional().nullable(),
  locationLat: z.string().optional().nullable(),
  locationLong: z.string().optional().nullable(),
  dob: z.string().optional().nullable(),
});
