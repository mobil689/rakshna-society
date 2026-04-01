import { createClient } from '@sanity/client';

export default async function handler(req: any, res: any) {
  // Use process.env for Node.js serverless functions (Vite's import.meta.env doesn't exist here)
  const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false, // Ensure we get fresh data for RSS feeds
    apiVersion: '2023-05-03',
  });

  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      "id": _id,
      "slug": slug.current,
      title,
      excerpt,
      "coverImage": coverImage.asset->url,
      publishedAt
    }`;
    
    const blogs = await client.fetch(query);

    // Build the XML manually
    let rssItems = '';
    
    blogs.forEach((blog: any) => {
      const postUrl = `https://rakshnamait.com/blog/${blog.slug}`;
      const pubDate = new Date(blog.publishedAt).toUTCString();
      const encodedTitle = blog.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const encodedExcerpt = blog.excerpt ? blog.excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
      
      let imageTag = '';
      if (blog.coverImage) {
        // Mailchimp uses RSS `<media:content>` tag or raw <img> in description for images
        imageTag = `<![CDATA[<img src="${blog.coverImage}" alt="Cover Image" />]]>`;
      }

      rssItems += `
        <item>
          <title>${encodedTitle}</title>
          <link>${postUrl}</link>
          <guid isPermaLink="true">${postUrl}</guid>
          <pubDate>${pubDate}</pubDate>
          <description>${imageTag} ${encodedExcerpt}</description>
        </item>
      `;
    });

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
          <title>Rakshna Society Blog</title>
          <link>https://rakshnamait.com/blog</link>
          <description>Latest insights and updates from Rakshna Society</description>
          <language>en-us</language>
          <atom:link href="https://rakshnamait.com/api/rss" rel="self" type="application/rss+xml"/>
          ${rssItems}
        </channel>
      </rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(rssFeed.trim());

  } catch (error) {
    console.error("RSS Generation Error:", error);
    res.status(500).send('Internal Server Error generating RSS feed');
  }
}
