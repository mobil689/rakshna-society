import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import {
  Newspaper, Loader2, ExternalLink, Search, RefreshCw,
  Clock, Filter, Zap, Globe, Shield, AlertTriangle,
  ChevronDown, X,
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
const SOURCE_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  'The Hacker News': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20' },
  'BleepingComputer': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  'Krebs on Security': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  'Dark Reading': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  'SecurityWeek': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  'CISA Advisories': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
};

const SOURCE_ICONS: Record<string, typeof Shield> = {
  'The Hacker News': Zap,
  'BleepingComputer': Globe,
  'Krebs on Security': Shield,
  'Dark Reading': AlertTriangle,
  'SecurityWeek': Newspaper,
  'CISA Advisories': Shield,
};

const ITEMS_PER_PAGE = 12;

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
  const colors = SOURCE_COLORS[article.source] || { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', glow: 'shadow-gray-500/20' };
  const SourceIcon = SOURCE_ICONS[article.source] || Newspaper;

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col h-full bg-card border border-border/40 rounded-2xl overflow-hidden
                 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5
                 transition-all duration-500 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image or gradient placeholder */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-muted/80 via-muted/40 to-transparent">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`p-4 rounded-2xl ${colors.bg} backdrop-blur-sm`}>
              <SourceIcon className={`h-10 w-10 ${colors.text}`} />
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

        {/* Source badge (floating) */}
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
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-grow">
          {article.description || 'Click to read the full article...'}
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
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [sourceStats, setSourceStats] = useState<Record<string, number>>({});

  const [activeSource, setActiveSource] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    else setIsLoading(true);

    setError(null);

    try {
      const response = await fetch('/api/news-scraper');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: ApiResponse = await response.json();

      if (!data.success) throw new Error('API returned an error');

      setArticles(data.articles);
      setFetchedAt(data.fetchedAt);
      setSourceStats(data.sources);
    } catch (err: any) {
      console.error('Failed to fetch news:', err);
      setError(err?.message || 'Failed to load news feed');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Derived: unique source names
  const sourceNames = useMemo(() => {
    const names = [...new Set(articles.map((a) => a.source))];
    return ['All', ...names];
  }, [articles]);

  // Filtered & searched articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    if (activeSource !== 'All') {
      filtered = filtered.filter((a) => a.source === activeSource);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [articles, activeSource, searchQuery]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cyber Threat Intelligence Feed"
        description="Live cybersecurity news aggregated from top sources — The Hacker News, BleepingComputer, Krebs on Security, Dark Reading, CISA, and more. Powered by RAKSHNA at MAIT."
        path="/news"
      />
      <Header />

      <main>
        {/* ═══ HERO SECTION ═══ */}
        <section className="relative overflow-hidden border-b border-border/40">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            {/* Grid pattern */}
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
                {fetchedAt && (
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    Updated {timeAgo(fetchedAt)}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-muted-foreground">
                Cyber Threat Intelligence
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Real-time cybersecurity news aggregated from {Object.keys(sourceStats).length || 6} trusted sources.
                Stay ahead of the latest threats, vulnerabilities, and security research.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Newspaper className="h-4 w-4 text-primary" />
                  <span><strong className="text-foreground">{articles.length}</strong> articles loaded</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4 text-primary" />
                  <span><strong className="text-foreground">{Object.keys(sourceStats).filter((k) => (sourceStats[k] || 0) > 0).length}</strong> active sources</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchNews(true)}
                  disabled={isRefreshing}
                  className="text-primary hover:text-primary"
                >
                  <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FILTERS & SEARCH ═══ */}
        <section className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

              {/* Source tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full lg:w-auto scrollbar-hide">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                {sourceNames.map((name) => {
                  const isActive = activeSource === name;
                  const colors = name !== 'All' ? SOURCE_COLORS[name] : null;
                  const count = name === 'All' ? filteredArticles.length : articles.filter((a) => a.source === name).length;

                  return (
                    <button
                      key={name}
                      onClick={() => {
                        setActiveSource(name);
                        setVisibleCount(ITEMS_PER_PAGE);
                      }}
                      className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
                        transition-all duration-300 border
                        ${isActive
                          ? colors
                            ? `${colors.bg} ${colors.text} ${colors.border}`
                            : 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-transparent text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border'
                        }
                      `}
                    >
                      {name}
                      <span className={`text-xs ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(ITEMS_PER_PAGE);
                  }}
                  className="w-full pl-9 pr-9 py-2 rounded-xl bg-muted/30 border border-border/50
                             text-sm placeholder:text-muted-foreground/60
                             focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30
                             transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NEWS GRID ═══ */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
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
              <Button onClick={() => fetchNews()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" /> Try Again
              </Button>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="p-4 bg-muted/50 rounded-2xl mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => { setSearchQuery(''); setActiveSource('All'); }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">{visibleArticles.length}</strong> of{' '}
                  <strong className="text-foreground">{filteredArticles.length}</strong> articles
                  {activeSource !== 'All' && (
                    <span> from <strong className="text-foreground">{activeSource}</strong></span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArticles.map((article, index) => (
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Load More ({filteredArticles.length - visibleCount} remaining)
                  </Button>
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