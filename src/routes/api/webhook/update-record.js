import { createClient } from '@libsql/client';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const db = createClient({
    url: process.env.PRIVATE_TURSO_DATABASE_URL,
    authToken: process.env.PRIVATE_TURSO_AUTH_TOKEN,
  });

  try {
    // Extract table and data from request body
    const { table, id, data } = req.body;

    // Validate table name
    const validTables = ['classes', 'faqs', 'images', 'reviews'];
    if (!validTables.includes(table)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    // Define SQL query and args based on table
    let sql, args;
    switch (table) {
      case 'classes':
        sql = 'INSERT OR REPLACE INTO classes (id, name, instructor, date, description, duration, price) VALUES (?, ?, ?, ?, ?, ?, ?)';
        args = [id, data.name, data.instructor, data.date, data.description, data.duration, data.price];
        break;
      case 'faqs':
        // Placeholder: Adjust with actual columns from your image
        sql = 'INSERT OR REPLACE INTO faqs (id, question, answer) VALUES (?, ?, ?)';
        args = [id, data.question, data.answer];
        break;
      case 'images':
        // Placeholder: Adjust with actual columns from your image
        sql = 'INSERT OR REPLACE INTO images (id, url, alt_text) VALUES (?, ?, ?)';
        args = [id, data.url, data.alt_text];
        break;
      case 'reviews':
        // Placeholder: Adjust with actual columns from your image
        sql = 'INSERT OR REPLACE INTO reviews (id, rating, comment) VALUES (?, ?, ?)';
        args = [id, data.rating, data.comment];
        break;
    }

    // Execute database update
    await db.execute({ sql, args });

    // Trigger webhook
    const webhookResponse = await fetch('https://e5.vercel.app/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBHOOK_TOKEN}`,
      },
    });
    if (!webhookResponse.ok) throw new Error(`Webhook failed: ${webhookResponse.statusText}`);

    return res.status(200).json({ message: `Record updated in ${table} and webhook triggered` });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: 'Failed to update record or trigger webhook' });
  }
}