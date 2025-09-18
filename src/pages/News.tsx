// In src/pages/News.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper } from 'lucide-react';

// Sample data for your news articles
const newsArticles = [
    {
        title: "RAKSHNA Society Announces First Capture-the-Flag Event",
        date: "September 18, 2025",
        category: "Events",
        description: "Get ready to test your skills! Our first ever CTF competition will be held in October. Registration opens next week."
    },
    {
        title: "Workshop on Ethical Hacking Basics a Success",
        date: "September 15, 2025",
        category: "Training",
        description: "Over 50 students attended our introductory workshop on ethical hacking, learning the fundamentals of penetration testing and vulnerability assessment."
    },
    {
        title: "New Phishing Scams Targeting Student Emails",
        date: "September 12, 2025",
        category: "Alert",
        description: "We've identified a new wave of phishing emails pretending to be from the university accounts office. Please be vigilant and do not click on suspicious links."
    },
];

const News = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="text-center mb-12">
                        <Newspaper className="h-16 w-16 mx-auto mb-4 text-primary" />
                        <h1 className="text-4xl font-bold mb-4">News & Announcements</h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Stay up-to-date with the latest news, security alerts, and event updates from RAKSHNA.
                        </p>
                    </div>

                    {/* News Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.map((article, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-muted-foreground">{article.date}</span>
                                        <Badge variant={article.category === 'Alert' ? 'destructive' : 'secondary'}>
                                            {article.category}
                                        </Badge>
                                    </div>
                                    <CardTitle>{article.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription>{article.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default News;