import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const data = response.results.map((page) => {
      const props = page.properties;
      return {
        name: props['Full name']?.title?.[0]?.text?.content || '—',
        email: props['Email']?.email || '—',
        creator: props['Assigned Creator']?.select?.name || '—',
        completedModules: [1, 2, 3, 4, 5, 6].filter(n => props[`Module ${n}`]?.checkbox).length,
        shadowingRequested: props['Shadowing Requested']?.rich_text?.[0]?.text?.content || '—',
        shadowingScheduled: props['Shadowing Scheduled']?.checkbox || false,
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: error.message });
  }
}
