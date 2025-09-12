import { createClient } from '@vercel/kv';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  // Check if a rebuild is pending
  const rebuildPending = await kv.get('rebuildPending');
  if (rebuildPending) {
    try {
      const response = await fetch(process.env.VERCEL_WEBHOOK_URL, { method: 'POST' });
      if (!response.ok) throw new Error(`Rebuild failed: ${response.statusText}`);
      await kv.set('lastBuildTime', Date.now().toString());
      await kv.del('rebuildPending');
      return res.status(200).json({ message: 'Hourly rebuild triggered' });
    } catch (error) {
      console.error('Rebuild error:', error);
      return res.status(500).json({ error: 'Failed to trigger rebuild' });
    }
  }
  return res.status(200).json({ message: 'No rebuild needed' });
}