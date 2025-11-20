import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { Loader2, Calendar, User, Linkedin, ArrowRight, Clock, X, ZoomIn, ZoomOut, Maximize2, Instagram } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

interface Article {
  _id: string;
  title: string;
  publishedAt: string;
  mainImage: any;
  body: any[];
  slug: { current: string };
  summary: string;
}

interface RelatedArticle {
    _id: string;
    title: string;
    publishedAt: string;
    slug: { current: string };
}

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [recentNews, setRecentNews] = useState<RelatedArticle[]>([]); // For the sidebar
  const [isLoading, setIsLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openImage = () => {
    setIsImageOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeImage = () => {
    setIsImageOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = 'unset';
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch current article
            const articleQuery = `*[_type == "newsArticle" && slug.current == $slug][0] {
                _id,
                title,
                publishedAt,
                mainImage,
                body,
                slug,
                summary
            }`;
            const articleData = await sanityClient.fetch(articleQuery, { slug });
            setArticle(articleData);

            // 2. Fetch recent news for sidebar (excluding current)
            const recentQuery = `*[_type == "newsArticle" && slug.current != $slug] | order(publishedAt desc)[0...4] {
                _id,
                title,
                publishedAt,
                slug
            }`;
            const recentData = await sanityClient.fetch(recentQuery, { slug });
            setRecentNews(recentData);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
    // Scroll to top when slug changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <Button asChild><Link to="/news">Return to News</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-primary">News</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT COLUMN: MAIN CONTENT (8 cols) --- */}
            <div className="lg:col-span-8">
                
                {/* Article Title Block */}
                <div className="mb-6">
                    <Badge className="mb-4 hover:bg-primary">News</Badge>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-foreground">
                        {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border/50">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium text-foreground">Editorial Team</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                        
                        {/* Social Share Icons (Visual) */}
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-blue-100 hover:text-blue-700" asChild>
                                <a href="https://linkedin.com/company/rakshana-mait" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-pink-100 hover:text-pink-600" asChild>
                                <a href="https://www.instagram.com/rakshnamait" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {article.mainImage && (
                    <div className="mb-8 rounded-xl overflow-hidden shadow-sm border group relative cursor-pointer" onClick={openImage}>
                        <img 
                            src={urlFor(article.mainImage).width(1200).height(675).url()}
                            alt={article.mainImage.alt || article.title}
                            className="w-full h-auto object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg">
                                <Maximize2 className="h-6 w-6 text-foreground" />
                            </div>
                        </div>
                         <p className="text-xs text-muted-foreground p-2 bg-muted/30 italic text-center">
                            {article.mainImage.caption || "Image representing the article topic"}
                        </p>
                    </div>
                )}

                {/* Image Viewer Modal */}
                {isImageOpen && article.mainImage && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={closeImage}
                    >
                        {/* Controls */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
                            <Button 
                                variant="secondary" 
                                size="icon" 
                                onClick={handleZoomOut}
                                disabled={zoomLevel <= 1}
                                className="rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
                            >
                                <ZoomOut className="h-5 w-5" />
                            </Button>
                            <span className="bg-black/50 text-white px-3 py-2 rounded-full text-sm font-medium min-w-[60px] text-center select-none">
                                {Math.round(zoomLevel * 100)}%
                            </span>
                            <Button 
                                variant="secondary" 
                                size="icon" 
                                onClick={handleZoomIn}
                                disabled={zoomLevel >= 3}
                                className="rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
                            >
                                <ZoomIn className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant="destructive" 
                                size="icon" 
                                onClick={closeImage}
                                className="rounded-full ml-2"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Image Container */}
                        <div 
                            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                             <div 
                                className="transition-transform duration-200 ease-out cursor-move"
                                style={{ transform: `scale(${zoomLevel})` }}
                                onClick={(e) => e.stopPropagation()}
                             >
                                <img 
                                    src={urlFor(article.mainImage).width(1600).url()}
                                    alt={article.mainImage.alt || article.title}
                                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-2xl"
                                />
                             </div>
                        </div>
                    </div>
                )}

                {/* The Content Body */}
                <article className="prose dark:prose-invert prose-lg max-w-none marker:text-primary prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
                    <PortableText value={article.body} />
                </article>
                
                {/* Tags / Categories (Visual) */}
                <div className="mt-10 pt-6 border-t">
                    <p className="text-sm font-semibold mb-3">Related Topics:</p>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="cursor-pointer">Cybersecurity</Badge>
                        <Badge variant="secondary" className="cursor-pointer">Campus News</Badge>
                        <Badge variant="secondary" className="cursor-pointer">Events</Badge>
                        <Badge variant="secondary" className="cursor-pointer">Technology</Badge>
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN: SIDEBAR (4 cols) --- */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Latest News Widget */}
                <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Latest News
                        </h3>
                        <Link to="/news" className="text-xs text-primary hover:underline">View All</Link>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                        {recentNews.length > 0 ? recentNews.map((item) => (
                            <Link to={`/news/${item.slug.current}`} key={item._id} className="group">
                                <div className="flex flex-col gap-2 pb-4 border-b last:border-0 last:pb-0">
                                    <h4 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(item.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </Link>
                        )) : (
                            <p className="text-sm text-muted-foreground">No other recent news.</p>
                        )}
                    </div>

                    {/* Mini Subscribe / Call to Action */}
                    <div className="mt-8 pt-6 border-t">
                        <h4 className="font-bold mb-2">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground mb-4">Join RAKSHNA to get the latest cyber alerts directly.</p>
                        <Button className="w-full">Join Society</Button>
                    </div>
                </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsArticle;