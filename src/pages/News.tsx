// The new, data-driven version of src/pages/News.tsx

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Newspaper, Loader2 } from 'lucide-react';
import { sanityClient } from '@/lib/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

// Set up a helper function to generate image URLs from Sanity data
const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
    return builder.image(source);
}

// Define the structure of an article (TypeScript interface)
interface Article {
    _id: string;
    title: string;
    publishedAt: string;
    summary: string;
    mainImage: {
        alt: string;
        asset: object;
    };
}

const News = () => {
    // State for storing articles and the loading status
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // This hook runs once when the page loads to fetch data
    useEffect(() => {
        // This is a GROQ query to fetch all news articles from Sanity, ordered by date
        const query = `*[_type == "newsArticle"] | order(publishedAt desc) {
      _id,
      title,
      publishedAt,
      summary,
      mainImage {
        alt,
        asset
      }
    }`;

        // Use the Sanity client to fetch the data
        sanityClient.fetch(query)
            .then((data) => {
                setArticles(data);
                setIsLoading(false); // Stop the loader
            })
            .catch(console.error);
    }, []); // The empty array ensures this effect runs only once

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

                    {/* Show a loading spinner while data is being fetched */}
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    ) : (
                        // Once loaded, display the grid of articles
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <Card key={article._id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                    {article.mainImage && (
                                        <img
                                            src={urlFor(article.mainImage.asset).width(600).height(400).url()}
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
            <Footer />
        </div>
    );
};

export default News;