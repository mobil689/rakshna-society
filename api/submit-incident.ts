// in api/submit-incident.ts

import { createClient } from '@sanity/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize the Sanity client using the environment variables from Vercel
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false, // `false` is required for write operations
    apiVersion: '2023-05-03', // Use a recent API version
});

// This is the main function that Vercel will run
export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    // Only allow POST requests, reject anything else
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // Get the form data from the request body
        const { fullName, emailAddress, attackType, description } = request.body;

        // Create the document to be saved in Sanity
        const doc = {
            _type: 'incidentReport',
            submittedAt: new Date().toISOString(),
            fullName,
            emailAddress,
            attackType,
            description,
            status: 'new', // Default status for all new reports
        };

        // Use the Sanity client to create the new document
        const result = await client.create(doc);

        // Send a success response back to the frontend
        return response.status(200).json({ success: true, message: 'Report submitted!', data: result });

    } catch (error) {
        console.error('Error submitting to Sanity:', error);
        // Send an error response back to the frontend
        return response.status(500).json({ success: false, message: 'Internal Server Error. Please try again.' });
    }
}