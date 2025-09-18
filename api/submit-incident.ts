// in api/submit-incident.ts

import { createClient } from '@sanity/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
    apiVersion: '2023-05-03',
});

export default async function handler(
    request: VercelRequest,
    response: VercelResponse,
) {
    if (request.method !== 'POST') {
        return response.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // We now look for an optional evidenceFileAssetId
        const { fullName, emailAddress, attackType, description, evidenceFileAssetId } = request.body;

        const doc: any = {
            _type: 'incidentReport',
            submittedAt: new Date().toISOString(),
            fullName,
            emailAddress,
            attackType,
            description,
            status: 'new',
        };

        // If an evidence file ID was sent, add it to the document
        if (evidenceFileAssetId) {
            doc.evidenceFile = {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: evidenceFileAssetId,
                },
            };
        }

        const result = await client.create(doc);
        return response.status(200).json({ success: true, message: 'Report submitted!', data: result });

    } catch (error) {
        console.error('Error submitting to Sanity:', error);
        return response.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
}