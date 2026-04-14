// in src/lib/sanityClient.ts

import { createClient } from '@sanity/client';

// Read client - uses CDN for fast reads
export const sanityClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true, // `true` for faster read operations
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_API_TOKEN,
});

// Write client - bypasses CDN for mutations (likes, etc.)
export const sanityWriteClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false, // Must be false for mutations
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_API_TOKEN,
});