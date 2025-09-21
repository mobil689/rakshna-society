// The final version of src/pages/News.tsx with clickable modals

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Newspaper, Loader2 } from 'lucide-react';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react'; // 1. Import the new library

// Helper function for images (unchanged)
const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
    return builder.image(source);
}

// Updated interface to include the full 'body'
interface Article {
    _id: string;
    title: string;
    publishedAt: string;
    summary: string;
    mainImage: any;
    body: any[]; // The rich text content
}

const News = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. New state to manage the selected article for the dialog
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    useEffect(() => {
        // 3. Updated query to fetch the 'body' of the article as well
        const query = `*[_type == "newsArticle"] | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      summary,
      mainImage,
      body // <-- Fetching the rich text body
    }`;

        sanityClient.fetch(query)
            .then((data) => {
                setArticles(data);
                setIsLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Newspaper className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h1 className="text-4xl font-bold mb-4">News & Announcements</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Stay up-to-date with the latest news, security alerts, and event updates from RAKSHNA.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                // 4. Added onClick handler to open the dialog
                                <Card
                                    key={article._id}
                                    className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                    onClick={() => setSelectedArticle(article)}
                                >
                                    {article.mainImage && (
                                        <img
                                            src={urlFor(article.mainImage).width(600).height(400).url()}
                                            alt={article.mainImage.alt || 'Article image'}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <CardHeader>
                    <span className="text-sm text-muted-foreground">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                                        <CardTitle>{article.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <CardDescription>{article.summary}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            // in src/pages/News.tsx, at the bottom of the file

            {/* The Dialog component that pops up when an article is selected */}
            <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
                <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0">
                    {selectedArticle && (
                        <>
                            {/* Image Section - Fixed height with proper aspect ratio */}
                            {selectedArticle.mainImage && (
                                <div className="relative w-full h-80 overflow-hidden">
                                    <img
                                        src={urlFor(selectedArticle.mainImage).width(1200).height(600).url()}
                                        alt={selectedArticle.mainImage.alt || 'Article image'}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            )}
                            
                            {/* Header Section - Fixed height */}
                            <DialogHeader className="p-6 text-left border-b bg-background flex-shrink-0">
                                <DialogTitle className="text-2xl md:text-3xl mb-3 break-words leading-tight">
                                    {selectedArticle.title}
                                </DialogTitle>
                                <DialogDescription className="text-base md:text-lg text-muted-foreground break-words leading-relaxed">
                                    {selectedArticle.summary}
                                </DialogDescription>
                                <span className="text-sm text-muted-foreground pt-3 block">
                                    Published on: {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                                </span>
                            </DialogHeader>
                            
                            {/* Content Section - Scrollable */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                <div className="prose dark:prose-invert max-w-none news-modal-content">
                                    <PortableText value={selectedArticle.body} />
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
};

export default News;