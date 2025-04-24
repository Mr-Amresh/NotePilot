import type { NextApiRequest, NextApiResponse } from 'next';
import { summarizeText } from '../../lib/utils/ai'; // Path to lib/utils/ai.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text is required and must be a string' });
  }

  try {
    const summary = await summarizeText(text);
    res.status(200).json({ summary });
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
}