import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, time } = req.body;
  if (!email || !time) {
    return res.status(400).json({ error: 'Missing email or time' });
  }

  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Email',
      email: { equals: email },
    },
  });

  const page = response.results[0];
  if (!page) return res.status(404).json({ error: 'User not found' });

  const name = page.properties['Full name'].title[0].text.content;

  await notion.pages.update({
    page_id: page.id,
    properties: {
      'Shadowing Requested': {
        rich_text: [{ text: { content: time } }],
      },
      'Shadowing Scheduled': {
        checkbox: true,
      },
    },
  });

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (webhook) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🔔 *New Shadowing Request Submitted*\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n🕒 *Preferred Time:* ${time}`,
      }),
    });
  }

  return res.status(200).json({ success: true });
}
