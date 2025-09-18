// in src/lib/sanityClient.ts

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true, // `true` for faster read operations
    apiVersion: '2023-05-03',
    // No token is needed for read-only public data
});