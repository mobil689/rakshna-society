// The new, data-driven version of LinkTray.tsx

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, ExternalLink, FileText, Newspaper, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { sanityClient } from '@/lib/sanityClient'; // Assuming you have this file
import imageUrlBuilder from '@sanity/image-url';

// Setup for Sanity images
const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
    return builder.image(source);
}

// Define the structure of our article data
interface Article {
    _id: string;
    title: string;
    summary: string;
    mainImage: any;
    slug: {
        current: string;
    };
}

const LinkTray = () => {
    // State for news articles and loading status
    const [news, setNews] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from Sanity when the component loads
    useEffect(() => {
        // This query fetches the 3 most recent news articles
        const query = `*[_type == "newsArticle"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      summary,
      mainImage,
      slug
    }`;

        sanityClient.fetch(query)
            .then((data) => {
                setNews(data);
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    // Your existing data for other cards
    const quickLinks = [
        { icon: AlertTriangle, title: 'Report Attack', description: 'Immediate incident reporting', link: '/portal', urgent: true },
        { icon: Calendar, title: 'Major Events', description: 'Critical security alerts', link: '/events', urgent: false },
        { icon: AlertTriangle, title: 'Current Alerts', description: 'Active threat notifications', link: '/alerts', urgent: true },
        { icon: FileText, title: 'Guidelines', description: 'Security best practices', link: '/guidelines', urgent: false },
    ];
    const externalLinks = [
        { name: 'CERT-In Security Guidelines', url: 'https://www.cert-in.org.in/' },
        { name: 'National Cyber Crime Portal', url: 'https://www.cybercrime.gov.in/' },
        { name: 'Cyber Dost Awareness', url: 'https://x.com/Cyberdost' },
        { name: 'I4C - Indian Cyber Crime Centre', url: 'https://i4c.gov.in/' },
    ];

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Quick Access Card (Unchanged) */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-primary">Quick Access</CardTitle>
                            <CardDescription>Essential security functions</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {quickLinks.map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <Button
                                        key={link.title}
                                        variant={link.urgent ? 'destructive' : 'outline'}
                                        className="w-full justify-start p-4 h-auto"
                                        asChild
                                    >
                                        <Link to={link.link}>
                                            <div className="flex items-center space-x-3">
                                                <IconComponent className="h-5 w-5 shrink-0" />
                                                <div className="text-left">
                                                    <div className="font-medium">{link.title}</div>
                                                    <div className="text-sm opacity-70">{link.description}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* UPDATED NEWS CAROUSEL */}
                    <Card className="lg:col-span-1 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-primary flex items-center gap-2">
                                <Newspaper className="h-5 w-5" />
                                Latest News
                            </CardTitle>
                            <CardDescription>Updates from the society</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            {isLoading ? (
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            ) : (
                                <Carousel
                                    className="w-full max-w-xs"
                                    plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
                                    opts={{ loop: true }}
                                >
                                    <CarouselContent>
                                        {news.map((article) => (
                                            <CarouselItem key={article._id}>
                                                <Link to={`/news#${article.slug.current}`}>
                                                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                                        <CardContent className="flex flex-col items-center justify-center p-0">
                                                            {article.mainImage && (
                                                                <img src={urlFor(article.mainImage).width(400).height(250).url()} alt={article.mainImage.alt || article.title} className="w-full h-40 object-cover" />
                                                            )}
                                                            <div className="p-4 text-left w-full">
                                                                <h3 className="font-semibold mb-2 leading-tight">{article.title}</h3>
                                                                <p className="text-sm text-muted-foreground">{article.summary}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            )}
                        </CardContent>
                    </Card>

                    {/* External Resources Card (Unchanged) */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-primary">External Resources</CardTitle>
                            <CardDescription>Trusted security organizations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {externalLinks.map((link) => (
                                <Button
                                    key={link.name}
                                    variant="ghost"
                                    className="w-full justify-between p-3 h-auto"
                                    asChild
                                >
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <span className="text-left text-sm font-medium">{link.name}</span>
                                        <ExternalLink className="h-4 w-4 shrink-0" />
                                    </a>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default LinkTray;