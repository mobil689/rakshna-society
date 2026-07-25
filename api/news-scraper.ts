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

// ─── Enhanced image extraction with multiple strategies ───
function extractImage(itemXml: string): string | null {
  // Strategy 1: media:content or media:thumbnail (most reliable)
  const mediaMatch = itemXml.match(/<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["']/i);
  if (mediaMatch && isValidImageUrl(mediaMatch[1])) return mediaMatch[1];

  // Strategy 2: enclosure with image type
  const enclosureMatch = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["'][^>]*type=["']image[^"']*["']/i);
  if (enclosureMatch && isValidImageUrl(enclosureMatch[1])) return enclosureMatch[1];

  // Strategy 3: enclosure (reverse order attributes — type before url)
  const enclosureRev = itemXml.match(/<enclosure[^>]*type=["']image[^"']*["'][^>]*url=["']([^"']+)["']/i);
  if (enclosureRev && isValidImageUrl(enclosureRev[1])) return enclosureRev[1];

  // Strategy 4: enclosure with image extension (no type specified)
  const enclosureAny = itemXml.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
  if (enclosureAny && /\.(jpg|jpeg|png|webp|gif|svg)/i.test(enclosureAny[1])) {
    return enclosureAny[1];
  }

  // Strategy 5: img tag inside content:encoded (common in WordPress feeds)
  const contentEncoded = getTagContent(itemXml, 'content:encoded');
  if (contentEncoded) {
    const imgInContent = contentEncoded.match(/(?:src|SRC)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*?)["']/i);
    if (imgInContent && isValidImageUrl(imgInContent[1])) return imgInContent[1];
  }

  // Strategy 6: img tag inside description
  const descHtml = getTagContent(itemXml, 'description');
  if (descHtml) {
    // Also decode CDATA and entities before searching
    const decoded = descHtml.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const imgInDesc = decoded.match(/(?:src|SRC)=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*?)["']/i);
    if (imgInDesc && isValidImageUrl(imgInDesc[1])) return imgInDesc[1];
  }

  // Strategy 7: any image URL in the raw item XML
  const anyImgUrl = itemXml.match(/(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^\s"'<>]*)?)/i);
  if (anyImgUrl && isValidImageUrl(anyImgUrl[1])) return anyImgUrl[1];

  return null;
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    // Filter out tracking pixels, tiny icons, and ad images
    if (u.pathname.includes('pixel') || u.pathname.includes('track') || u.pathname.includes('beacon')) return false;
    if (u.pathname.includes('/1x1') || u.pathname.includes('/1.gif')) return false;
    // Must be http/https
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// ─── Fetch OG image from article page as last resort ───
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RakshnaSociety/1.0)',
        'Accept': 'text/html',
      },
      redirect: 'follow',
    });
    clearTimeout(timeout);

    if (!resp.ok) return null;

    // Only read first 15KB to find og:image quickly
    const reader = resp.body?.getReader();
    if (!reader) return null;

    let html = '';
    const decoder = new TextDecoder();
    while (html.length < 15000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel();

    // og:image
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    if (ogMatch && isValidImageUrl(ogMatch[1])) return ogMatch[1];

    // twitter:image
    const twMatch = html.match(/<meta[^>]*(?:name|property)=["']twitter:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*(?:name|property)=["']twitter:image["']/i);
    if (twMatch && isValidImageUrl(twMatch[1])) return twMatch[1];

    return null;
  } catch {
    return null;
  }
}

async function fetchAndParseRSS(source: typeof RSS_SOURCES[number]): Promise<NewsItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RakshnaSociety-NewsAggregator/1.0)',
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

    // Take up to 8 articles per source for better coverage
    const articlesToProcess = matches.slice(0, 8);

    for (const match of articlesToProcess) {
      const itemXml = match[1];

      const title = stripHtml(getTagContent(itemXml, 'title'));
      if (!title) continue;

      let link = getTagContent(itemXml, 'link');
      // For Atom feeds, link might be in href attribute
      if (!link) {
        const linkMatch = itemXml.match(/<link[^>]*href=["']([^"']+)["']/i);
        if (linkMatch) link = linkMatch[1];
      }
      // Some feeds have link as self-closing tag with text content
      if (!link) {
        const linkText = itemXml.match(/<link[^>]*>(https?:\/\/[^<]+)<\/link>/i);
        if (linkText) link = linkText[1].trim();
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

    // For items without images, try fetching OG image from their article page
    // Limit to max 3 OG-fetches per source to stay fast
    let ogFetchCount = 0;
    const ogPromises: Promise<void>[] = [];

    for (const item of items) {
      if (!item.imageUrl && item.link && ogFetchCount < 3) {
        ogFetchCount++;
        ogPromises.push(
          fetchOgImage(item.link).then((ogImg) => {
            if (ogImg) item.imageUrl = ogImg;
          })
        );
      }
    }

    if (ogPromises.length > 0) {
      await Promise.allSettled(ogPromises);
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
    const categoryStats: Record<string, number> = {};

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        allItems.push(...result.value);
        sourceStats[RSS_SOURCES[index].name] = result.value.length;
        // Build category stats
        result.value.forEach((item) => {
          categoryStats[item.category] = (categoryStats[item.category] || 0) + 1;
        });
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
      categories: categoryStats,
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
