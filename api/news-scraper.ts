import type { VercelRequest, VercelResponse } from '@vercel/node';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  sourceUrl: string;
  imageUrl: string | null;
  category: string;
}

const RSS_SOURCES = [
  {
    name: 'The Hacker News',
    url: 'https://feeds.feedburner.com/TheHackersNews',
    sourceUrl: 'https://thehackernews.com',
    category: 'Threat Intel',
  },
  {
    name: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/feed/',
    sourceUrl: 'https://www.bleepingcomputer.com',
    category: 'Security News',
  },
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    sourceUrl: 'https://krebsonsecurity.com',
    category: 'Investigative',
  },
  {
    name: 'Dark Reading',
    url: 'https://www.darkreading.com/rss.xml',
    sourceUrl: 'https://www.darkreading.com',
    category: 'Enterprise Security',
  },
  {
    name: 'SecurityWeek',
    url: 'https://feeds.feedburner.com/securityweek',
    sourceUrl: 'https://www.securityweek.com',
    category: 'Industry News',
  },
];

// ─── Robust HTML/XML stripping ───────────────────────────
function stripHtml(html: string): string {
  if (!html) return '';

  let text = html;

  // 1. Remove CDATA wrappers
  text = text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1');

  // 2. Decode common HTML entities FIRST (before stripping tags)
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&#\d+;/g, ''); // numeric entities

  // 3. Now strip ALL HTML tags (including any that were entity-encoded)
  text = text.replace(/<[^>]*>/g, '');

  // 4. Run tag strip again in case entity-decoded tags remain
  text = text.replace(/<[^>]*>/g, '');

  // 5. Remove any remaining URLs that look like raw links
  text = text.replace(/https?:\/\/\S+/g, '');

  // 6. Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // 7. If the result still looks like garbage (too many special chars), return empty
  const alphaRatio = (text.match(/[a-zA-Z]/g) || []).length / (text.length || 1);
  if (text.length > 10 && alphaRatio < 0.3) return '';

  return text;
}

// Simple XML tag text extractor
function getTagContent(xml: string, tag: string): string {
  // Try CDATA first
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  // Regular tag content
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// Extract image URL from various RSS formats
function extractImage(itemXml: string): string | null {
  // media:content or media:thumbnail
  const mediaMatch = itemXml.match(/<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["']/i);
  if (mediaMatch) return mediaMatch[1];

  // enclosure with image type
  const enclosureMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image[^"']*["']/i);
  if (enclosureMatch) return enclosureMatch[1];

  // enclosure with image extension
  const enclosureAnyMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
  if (enclosureAnyMatch && /\.(jpg|jpeg|png|webp|gif)/i.test(enclosureAnyMatch[1])) {
    return enclosureAnyMatch[1];
  }

  // img tag inside description/content — only if it looks like a real image URL
  const imgMatch = itemXml.match(/<img[^>]*src=["'](https?:\/\/[^"']+\.(jpg|jpeg|png|webp|gif)[^"']*)["']/i);
  if (imgMatch) return imgMatch[1];

  return null;
}

async function fetchAndParseRSS(source: typeof RSS_SOURCES[number]): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'RakshnaSociety-NewsScraper/1.0',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Failed to fetch ${source.name}: ${response.status}`);
      return [];
    }

    const xml = await response.text();

    const items: NewsItem[] = [];
    const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
    const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;

    let matches = [...xml.matchAll(itemRegex)];
    if (matches.length === 0) {
      matches = [...xml.matchAll(entryRegex)];
    }

    // ✅ Only take 5 articles per source
    for (const match of matches.slice(0, 5)) {
      const itemXml = match[1];

      const title = stripHtml(getTagContent(itemXml, 'title'));
      if (!title) continue;

      let link = getTagContent(itemXml, 'link');
      // For Atom feeds, link might be in href attribute
      if (!link) {
        const linkMatch = itemXml.match(/<link[^>]*href=["']([^"']+)["']/i);
        if (linkMatch) link = linkMatch[1];
      }

      let description = stripHtml(
        getTagContent(itemXml, 'description') ||
        getTagContent(itemXml, 'summary') ||
        getTagContent(itemXml, 'content')
      );

      // Truncate to ~200 chars cleanly
      if (description.length > 200) {
        description = description.substring(0, 197).replace(/\s+\S*$/, '') + '...';
      }

      // Skip articles with empty or very short descriptions after cleaning
      if (description.length < 15) {
        description = 'Click to read the full article on ' + source.name;
      }

      const pubDateStr = getTagContent(itemXml, 'pubDate') ||
        getTagContent(itemXml, 'published') ||
        getTagContent(itemXml, 'dc:date') ||
        getTagContent(itemXml, 'updated');

      const imageUrl = extractImage(itemXml);

      const id = `${source.name.replace(/\s/g, '-').toLowerCase()}-${Buffer.from(link || title).toString('base64').substring(0, 16)}`;

      items.push({
        id,
        title,
        description,
        link,
        pubDate: pubDateStr || new Date().toISOString(),
        source: source.name,
        sourceUrl: source.sourceUrl,
        imageUrl,
        category: source.category,
      });
    }

    return items;
  } catch (error: any) {
    console.error(`Error scraping ${source.name}:`, error?.message || error);
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const results = await Promise.allSettled(
      RSS_SOURCES.map((source) => fetchAndParseRSS(source))
    );

    const allItems: NewsItem[] = [];
    const sourceStats: Record<string, number> = {};

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
        sourceStats[RSS_SOURCES[index].name] = result.value.length;
      } else {
        sourceStats[RSS_SOURCES[index].name] = 0;
      }
    });

    // Sort by date (newest first)
    allItems.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;
      return dateB - dateA;
    });

    // ✅ Cache for 12 hours (43200s), stale-while-revalidate for 6 hours
    res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate=21600');
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json({
      success: true,
      totalArticles: allItems.length,
      sources: sourceStats,
      fetchedAt: new Date().toISOString(),
      articles: allItems,
    });
  } catch (error: any) {
    console.error('News scraper error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch news feeds',
      message: error?.message,
    });
  }
}
