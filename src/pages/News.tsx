import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import {
  Newspaper, ExternalLink,
  Clock, Zap, Globe, Shield, AlertTriangle,
  ChevronDown, Loader2, Filter,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
interface NewsArticle {
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

interface ApiResponse {
  success: boolean;
  totalArticles: number;
  sources: Record<string, number>;
  fetchedAt: string;
  articles: NewsArticle[];
}

// ─── Constants ───────────────────────────────────────────
const ARTICLES_PER_PAGE = 10;

const SOURCE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'The Hacker News': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
  'BleepingComputer': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'Krebs on Security': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  'Dark Reading': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
  'SecurityWeek': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

const SOURCE_ICONS: Record<string, typeof Shield> = {
  'The Hacker News': Zap,
  'BleepingComputer': Globe,
  'Krebs on Security': Shield,
  'Dark Reading': AlertTriangle,
  'SecurityWeek': Newspaper,
};

const GRADIENT_PALETTES = [
  'from-red-900/40 via-red-800/20 to-slate-900/60',
  'from-blue-900/40 via-indigo-800/20 to-slate-900/60',
  'from-amber-900/40 via-orange-800/20 to-slate-900/60',
  'from-purple-900/40 via-violet-800/20 to-slate-900/60',
  'from-emerald-900/40 via-teal-800/20 to-slate-900/60',
  'from-cyan-900/40 via-sky-800/20 to-slate-900/60',
  'from-rose-900/40 via-pink-800/20 to-slate-900/60',
  'from-lime-900/40 via-green-800/20 to-slate-900/60',
];

function getGradientForArticle(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  return GRADIENT_PALETTES[Math.abs(hash) % GRADIENT_PALETTES.length];
}

// ─── Helpers ─────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return 'Recently';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/<[^>]*>/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Skeleton Loader ─────────────────────────────────────
const NewsCardSkeleton = () => (
  <div className="group relative bg-card border border-border/40 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-muted/50" />
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-24 bg-muted/50 rounded-full" />
        <div className="h-4 w-12 bg-muted/50 rounded-full" />
      </div>
      <div className="h-5 w-full bg-muted/50 rounded" />
      <div className="h-5 w-3/4 bg-muted/50 rounded" />
      <div className="h-4 w-full bg-muted/30 rounded" />
      <div className="h-4 w-2/3 bg-muted/30 rounded" />
    </div>
  </div>
);

// ─── News Card ───────────────────────────────────────────
const NewsCard = ({ article, index }: { article: NewsArticle; index: number }) => {
  const colors = SOURCE_COLORS[article.source] || { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30' };
  const SourceIcon = SOURCE_ICONS[article.source] || Newspaper;
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const gradientBg = getGradientForArticle(article.id);
  const hasImage = article.imageUrl && !imgError;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-card border border-border/40 rounded-2xl overflow-hidden
                 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                 transition-all duration-500 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${Math.min(index, 9) * 60}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} flex items-center justify-center transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className={`p-3 rounded-xl ${colors.bg} backdrop-blur-sm animate-pulse`}>
                <SourceIcon className={`h-8 w-8 ${colors.text}`} />
              </div>
            </div>
            <img
              src={article.imageUrl!}
              alt=""
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg}`}>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`p-4 rounded-2xl ${colors.bg} backdrop-blur-sm border ${colors.border}`}>
                <SourceIcon className={`h-10 w-10 ${colors.text}`} />
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

        <div className="absolute top-3 left-3">
          <Badge className={`${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-md text-xs font-medium`}>
            <SourceIcon className="h-3 w-3 mr-1" />
            {article.source}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/70 backdrop-blur-md text-xs">
            {article.category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {sanitizeText(article.title)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
          {sanitizeText(article.description) || 'Click to read the full article...'}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {timeAgo(article.pubDate)}
          </span>
          <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read More <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </a>
  );
};

// ─── Main Component ──────────────────────────────────────
const News = () => {
  // All articles from the API
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceStats, setSourceStats] = useState<Record<string, number>>({});

  // The ONE filter: which source is selected. "All" means show everything.
  const [selectedSource, setSelectedSource] = useState('All');

  // How many articles are currently visible (pagination)
  const [showCount, setShowCount] = useState(ARTICLES_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch articles on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/news-scraper');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        if (!data.success) throw new Error('API error');
        if (!cancelled) {
          setAllArticles(data.articles);
          setSourceStats(data.sources);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  // ──────────────────────────────────────────────────────────
  // FILTER LOGIC — this is as simple as it gets:
  // If selectedSource is "All", show all articles.
  // Otherwise, show only articles where article.source === selectedSource.
  // ──────────────────────────────────────────────────────────
  let articlesToShow: NewsArticle[];
  if (selectedSource === 'All') {
    articlesToShow = allArticles;
  } else {
    articlesToShow = [];
    for (let i = 0; i < allArticles.length; i++) {
      if (allArticles[i].source === selectedSource) {
        articlesToShow.push(allArticles[i]);
      }
    }
  }

  // Pagination: only show first `showCount` of the filtered list
  const displayedArticles = articlesToShow.slice(0, showCount);
  const hasMore = showCount < articlesToShow.length;
  const remaining = articlesToShow.length - showCount;

  // Build list of source names from the data
  const sourceList: string[] = ['All'];
  const seen = new Set<string>();
  for (const a of allArticles) {
    if (!seen.has(a.source)) {
      seen.add(a.source);
      sourceList.push(a.source);
    }
  }

  // When user clicks a source filter (click active source toggles back to 'All')
  function onSourceClick(source: string) {
    setSelectedSource(prev => (prev === source ? 'All' : source));
    setShowCount(ARTICLES_PER_PAGE); // reset pagination
  }

  // Load more button
  function onLoadMore() {
    setLoadingMore(true);
    setTimeout(() => {
      setShowCount(prev => prev + ARTICLES_PER_PAGE);
      setLoadingMore(false);
    }, 200);
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cyber Threat Intelligence Feed"
        description="Live cybersecurity news aggregated from top sources — The Hacker News, BleepingComputer, Krebs on Security, Dark Reading, and more. Powered by RAKSHNA at MAIT."
        path="/news"
      />
      <Header />

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Live Feed
                </Badge>
                {!isLoading && allArticles.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {allArticles.length} articles
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                Cyber Threat Intelligence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Cybersecurity news aggregated from {Object.keys(sourceStats).length || 5} trusted sources.
                Stay ahead of the latest threats, vulnerabilities, and security research.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ SOURCE FILTER TABS ═══ */}
        <section className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              {sourceList.map((name) => {
                const active = selectedSource === name;
                const clr = name !== 'All' ? SOURCE_COLORS[name] : null;
                const Icon = name !== 'All' ? SOURCE_ICONS[name] : null;

                // Count articles for this source
                let count: number;
                if (name === 'All') {
                  count = allArticles.length;
                } else {
                  count = 0;
                  for (const a of allArticles) {
                    if (a.source === name) count++;
                  }
                }

                return (
                  <button
                    type="button"
                    key={name}
                    onClick={() => onSourceClick(name)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                      transition-all duration-200 border cursor-pointer select-none
                      ${active
                        ? clr
                          ? `${clr.bg} ${clr.text} ${clr.border}`
                          : 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border'
                      }
                    `}
                  >
                    {Icon && <Icon className="h-3 w-3" />}
                    {name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/10' : 'bg-muted/50'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Show count when filtered */}
            {selectedSource !== 'All' && (
              <p className="text-xs text-muted-foreground mt-2">
                Showing {articlesToShow.length} articles from {selectedSource}
              </p>
            )}
          </div>
        </section>

        {/* ═══ NEWS GRID ═══ */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 bg-destructive/10 rounded-2xl mb-4">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Failed to Load News</h3>
              <p className="text-muted-foreground mb-6 max-w-md">{error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : displayedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 bg-muted/50 rounded-2xl mb-4">
                <Newspaper className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Articles</h3>
              <p className="text-muted-foreground mb-6">
                No articles found for this source.
              </p>
              <Button onClick={() => onSourceClick('All')} variant="outline">
                Show All Sources
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedArticles.map((article, idx) => (
                  <NewsCard key={article.id} article={article} index={idx} />
                ))}
              </div>

              {hasMore && (
                <div className="flex flex-col items-center mt-10 gap-3">
                  <Button
                    type="button"
                    onClick={onLoadMore}
                    disabled={loadingMore}
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8 rounded-xl border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Load More ({Math.min(remaining, ARTICLES_PER_PAGE)} of {remaining} remaining)
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Showing {displayedArticles.length} of {articlesToShow.length} articles
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* ═══ SOURCE ATTRIBUTION ═══ */}
        {!isLoading && allArticles.length > 0 && (
          <section className="border-t border-border/40">
            <div className="container mx-auto px-4 py-8">
              <p className="text-xs text-muted-foreground text-center mb-4">
                News aggregated from trusted cybersecurity sources. All articles link to their original publishers.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {Object.entries(sourceStats).map(([name, count]) => {
                  const colors = SOURCE_COLORS[name] || { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
                  return (
                    <span
                      key={name}
                      className={`text-xs px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {name}: {count} articles
                    </span>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default News;