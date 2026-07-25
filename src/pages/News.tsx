import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import {
  Newspaper, ExternalLink, Search,
  Clock, Filter, Zap, Globe, Shield, AlertTriangle,
  X, ChevronDown, Loader2, SlidersHorizontal, RotateCcw,
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
  categories?: Record<string, number>;
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

// Deterministic gradient backgrounds for articles without images
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

// Client-side safety net — strip any HTML that leaked through the API
function sanitizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/<[^>]*>/g, '') // second pass after entity decode
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Search ─────────────────────────────────────────────
// Simple but correct search: every query word must match at least one field
function searchArticles(articles: NewsArticle[], query: string): NewsArticle[] {
  if (!query.trim()) return articles;

  const q = query.toLowerCase().trim();
  const queryWords = q.split(/\s+/).filter(w => w.length > 0);

  // Score each article
  const results: { article: NewsArticle; score: number }[] = [];

  for (const article of articles) {
    const title = article.title.toLowerCase();
    const desc = article.description.toLowerCase();
    const source = article.source.toLowerCase();
    const category = article.category.toLowerCase();
    const allText = `${title} ${desc} ${source} ${category}`;

    // Every query word must appear in at least one field
    const allWordsMatch = queryWords.every(word => allText.includes(word));
    if (!allWordsMatch) continue;

    // Score: how well does it match?
    let score = 0;

    // Full query substring match
    if (title.includes(q)) score += 100;
    else if (source.includes(q)) score += 80;
    else if (category.includes(q)) score += 60;
    else if (desc.includes(q)) score += 40;

    // Per-word scoring
    for (const word of queryWords) {
      if (title.includes(word)) score += 20;
      if (source.includes(word)) score += 10;
      if (category.includes(word)) score += 8;
      if (desc.includes(word)) score += 5;

      // Word starts with query word (partial match bonus)
      const titleWords = title.split(/\s+/);
      if (titleWords.some(tw => tw.startsWith(word))) score += 15;
    }

    results.push({ article, score });
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results.map(r => r.article);
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

  const cleanDescription = sanitizeText(article.description);
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
      {/* Image section — always shows something */}
      <div className="relative h-48 overflow-hidden">
        {hasImage ? (
          <>
            {/* Gradient background shown while image loads */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientBg} flex items-center justify-center transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className={`p-3 rounded-xl ${colors.bg} backdrop-blur-sm animate-pulse`}>
                <SourceIcon className={`h-8 w-8 ${colors.text}`} />
              </div>
            </div>
            <img
              src={article.imageUrl!}
              alt=""
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          /* Styled fallback — gradient + icon + pattern */
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

        {/* Source badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${colors.bg} ${colors.text} ${colors.border} border backdrop-blur-md text-xs font-medium`}>
            <SourceIcon className="h-3 w-3 mr-1" />
            {article.source}
          </Badge>
        </div>

        {/* Category */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/70 backdrop-blur-md text-xs">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {sanitizeText(article.title)}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
          {cleanDescription || 'Click to read the full article...'}
        </p>

        {/* Footer */}
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
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceStats, setSourceStats] = useState<Record<string, number>>({});

  // Filters — each is independent state
  const [activeSource, setActiveSource] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');

  // Pagination
  const [visibleCount, setVisibleCount] = useState<number>(ARTICLES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ── Debounce search ──
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setVisibleCount(ARTICLES_PER_PAGE); // reset pagination on search change
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ── Reset pagination when filters change ──
  useEffect(() => {
    setVisibleCount(ARTICLES_PER_PAGE);
  }, [activeSource, activeCategory]);

  // ── Fetch news data ──
  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/news-scraper');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: ApiResponse = await response.json();
      if (!data.success) throw new Error('API returned an error');

      setArticles(data.articles);
      setSourceStats(data.sources);
    } catch (err: any) {
      console.error('Failed to fetch news:', err);
      setError(err?.message || 'Failed to load news feed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // ── Derived data ──
  const sourceNames = useMemo(() => {
    const names = [...new Set(articles.map(a => a.source))];
    return ['All', ...names];
  }, [articles]);

  const categoryNames = useMemo(() => {
    const cats = [...new Set(articles.map(a => a.category))];
    return ['All', ...cats];
  }, [articles]);

  // ── THE CORE FILTER LOGIC ──
  // This is the single source of truth for what articles to display
  const filteredArticles = useMemo(() => {
    let result = [...articles]; // always start from a fresh copy

    // Step 1: Filter by source
    if (activeSource !== 'All') {
      result = result.filter(a => a.source === activeSource);
    }

    // Step 2: Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(a => a.category === activeCategory);
    }

    // Step 3: Search within the already-filtered results
    if (debouncedQuery.trim()) {
      result = searchArticles(result, debouncedQuery);
    }

    return result;
  }, [articles, activeSource, activeCategory, debouncedQuery]);

  // ── Paginated slice of filtered articles ──
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const hasMore = visibleCount < filteredArticles.length;
  const remainingCount = Math.max(0, filteredArticles.length - visibleCount);

  // ── Handlers ──
  const handleSourceFilter = useCallback((source: string) => {
    setActiveSource(prev => prev === source ? 'All' : source);
  }, []);

  const handleCategoryFilter = useCallback((category: string) => {
    setActiveCategory(prev => prev === category ? 'All' : category);
  }, []);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + ARTICLES_PER_PAGE);
      setIsLoadingMore(false);
    }, 200);
  }, []);

  const handleClearAll = useCallback(() => {
    setActiveSource('All');
    setActiveCategory('All');
    setSearchQuery('');
    setDebouncedQuery('');
    setVisibleCount(ARTICLES_PER_PAGE);
  }, []);

  const isFiltered = activeSource !== 'All' || activeCategory !== 'All' || debouncedQuery !== '';

  // ── Counts for filter badges (show count from total articles, not filtered) ──
  const getSourceCount = useCallback((source: string) => {
    if (source === 'All') return articles.length;
    return articles.filter(a => a.source === source).length;
  }, [articles]);

  const getCategoryCount = useCallback((cat: string) => {
    if (cat === 'All') return articles.length;
    return articles.filter(a => a.category === cat).length;
  }, [articles]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cyber Threat Intelligence Feed"
        description="Live cybersecurity news aggregated from top sources — The Hacker News, BleepingComputer, Krebs on Security, Dark Reading, and more. Powered by RAKSHNA at MAIT."
        path="/news"
      />
      <Header />

      <main>
        {/* ═══ HERO SECTION ═══ */}
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
                {!isLoading && articles.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {articles.length} articles
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

        {/* ═══ FILTERS & SEARCH ═══ */}
        <section className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-3">
              {/* Row 1: Search bar */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <input
                    id="news-search-input"
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted/30 border border-border/50
                               text-sm placeholder:text-muted-foreground/60
                               focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30
                               transition-all duration-300"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {isFiltered && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="shrink-0 text-muted-foreground hover:text-foreground gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear All
                  </Button>
                )}
              </div>

              {/* Row 2: Source filter buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                {sourceNames.map((name) => {
                  const isActive = activeSource === name;
                  const clr = name !== 'All' ? SOURCE_COLORS[name] : null;
                  const Icon = name !== 'All' ? SOURCE_ICONS[name] : null;

                  return (
                    <button
                      type="button"
                      key={`src-${name}`}
                      id={`filter-source-${name.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleSourceFilter(name)}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                        transition-all duration-200 border cursor-pointer select-none
                        ${isActive
                          ? clr
                            ? `${clr.bg} ${clr.text} ${clr.border}`
                            : 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border'
                        }
                      `}
                    >
                      {Icon && <Icon className="h-3 w-3" />}
                      {name}
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/10' : 'bg-muted/50'}`}>
                        {getSourceCount(name)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row 3: Category filter buttons */}
              {categoryNames.length > 2 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground shrink-0" />
                  {categoryNames.map((cat) => {
                    const isActive = activeCategory === cat;

                    return (
                      <button
                        type="button"
                        key={`cat-${cat}`}
                        id={`filter-category-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => handleCategoryFilter(cat)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                          transition-all duration-200 border cursor-pointer select-none
                          ${isActive
                            ? 'bg-primary/10 text-primary border-primary/30'
                            : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border'
                          }
                        `}
                      >
                        {cat}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/10' : 'bg-muted/50'}`}>
                          {getCategoryCount(cat)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active filter summary bar */}
              {isFiltered && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Showing {filteredArticles.length} of {articles.length} articles
                  </span>
                  {debouncedQuery && (
                    <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => setSearchQuery('')}>
                      Search: &quot;{debouncedQuery}&quot;
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {activeSource !== 'All' && (
                    <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => setActiveSource('All')}>
                      Source: {activeSource}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                  {activeCategory !== 'All' && (
                    <Badge variant="secondary" className="text-xs gap-1 cursor-pointer" onClick={() => setActiveCategory('All')}>
                      Category: {activeCategory}
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
              )}
            </div>
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
              <Button onClick={fetchNews} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 bg-muted/50 rounded-2xl mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-2">
                No articles match your current filters.
              </p>
              {debouncedQuery && (
                <p className="text-sm text-muted-foreground mb-4">
                  Try different keywords or check your spelling.
                </p>
              )}
              <Button onClick={handleClearAll} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Article grid — ONLY renders visibleArticles (paginated subset of filteredArticles) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArticles.map((article, idx) => (
                  <NewsCard key={article.id} article={article} index={idx} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex flex-col items-center mt-10 gap-3">
                  <Button
                    type="button"
                    id="load-more-articles"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    variant="outline"
                    size="lg"
                    className="gap-2 px-8 rounded-xl border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Load More ({Math.min(remainingCount, ARTICLES_PER_PAGE)} of {remainingCount} remaining)
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Showing {visibleArticles.length} of {filteredArticles.length} articles
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* ═══ SOURCE ATTRIBUTION ═══ */}
        {!isLoading && articles.length > 0 && (
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