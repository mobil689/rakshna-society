import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Newspaper, Loader2, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

interface Article {
  _id: string;
  title: string;
  publishedAt: string;
  summary: string;
  mainImage: any;
  slug: {
    current: string;
  };
}

const News = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const query = `*[_type == "newsArticle"] | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      summary,
      mainImage,
      slug
    }`;

    sanityClient.fetch(query)
      .then((data) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, []);

  // --- Carousel Logic ---
  // We take the top 5 for the carousel
  const featuredArticles = articles.slice(0, 5);
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (featuredArticles.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
                  <Newspaper className="h-8 w-8 text-primary" />
                  Newsroom
                </h1>
                <p className="text-muted-foreground text-lg">Latest updates from the RAKSHNA community.</p>
            </div>
            <Button variant="outline">Subscribe to Alerts</Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* --- FEATURED CAROUSEL (Top 5) --- */}
              {featuredArticles.length > 0 && (
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-16 group">
                  
                  {featuredArticles.map((article, index) => (
                    <div
                      key={article._id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        {article.mainImage && (
                          <img
                            src={urlFor(article.mainImage).width(1200).height(800).url()}
                            alt={article.mainImage.alt || article.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                        <div className="max-w-3xl animate-in slide-in-from-bottom-4 duration-700 fade-in">
                          <Badge className="mb-4 bg-primary text-primary-foreground border-none">
                            Featured Story
                          </Badge>
                          <Link to={`/news/${article.slug.current}`}>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight hover:text-primary-foreground/80 transition-colors">
                              {article.title}
                            </h2>
                          </Link>
                          <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Button asChild size="lg" className="rounded-full">
                            <Link to={`/news/${article.slug.current}`}>
                              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Carousel Controls */}
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-6 right-6 md:right-12 z-20 flex gap-2">
                    {featuredArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* --- STANDARD NEWS GRID (Displaying ALL News now) --- */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">Recent News</h3>
                {articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                      <Link 
                        to={`/news/${article.slug.current}`} 
                        key={article._id}
                        className="group flex flex-col h-full"
                      >
                        <Card className="flex flex-col h-full overflow-hidden border-border/40 hover:shadow-lg transition-all duration-300">
                          {article.mainImage && (
                            <div className="relative overflow-hidden h-56">
                              <img
                                src={urlFor(article.mainImage).width(800).height(500).url()}
                                alt={article.mainImage.alt || 'Article image'}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute top-4 left-4">
                                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">News</Badge>
                              </div>
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            </div>
                            <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                              {article.summary}
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="pt-0">
                              <span className="text-sm font-medium text-primary flex items-center group-hover:underline">
                                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                              </span>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">No news stories to display.</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;