// in src/lib/sanityClient.ts

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true, // `true` for faster read operations
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_API_TOKEN, // Required for file uploads
});