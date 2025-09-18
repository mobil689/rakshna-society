import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {AlertTriangle, Calendar, ExternalLink, FileText, Newspaper, Search} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

//  news data array
const newsData = [
    {
        id: 'rakshna-ctf-event',
        title: 'RAKSHNA Society Announces First CTF Event',
        summary: 'Get ready to test your skills! Our first ever Capture-the-Flag competition will be held in October.',
        image: '/news1.jpg',
    },
    {
        id: 'phishing-scam-alert',
        title: 'New Phishing Scams Targeting Student Emails',
        summary: 'We have identified a new wave of phishing emails pretending to be from the university accounts office.',
        image: '/news2.png',
    },
    {
        id: 'ethical-hacking-workshop',
        title: 'Ethical Hacking Workshop A Success',
        summary: 'Over 50 students attended our introductory workshop on ethical hacking and vulnerability assessment.',
        image: '/news3.png',
    },
];

const LinkTray = () => {
  const quickLinks = [
    {
      icon: AlertTriangle,
      title: 'Report Attack',
      description: 'Immediate incident reporting',
      link: '/portal',
      urgent: true,
    },
    {
      icon: Calendar,
      title: 'Major Events',
      description: 'Critical security alerts',
      link: '/events',
      urgent: false,
    },
    {
      icon: AlertTriangle,
      title: 'Current Alerts',
      description: 'Active threat notifications',
      link: '/alerts',
      urgent: true,
    },
    {
      icon: FileText,
      title: 'Guidelines',
      description: 'Security best practices',
      link: '/guidelines',
      urgent: false,
    },
  ];


    const externalLinks = [
        { name: 'CERT-In Security Guidelines', url: 'https://www.cert-in.org.in/' },
        { name: 'National Cyber Crime Portal', url: 'https://www.cybercrime.gov.in/' },
        { name: 'Cyber Dost Awareness', url: 'https://x.com/Cyberdost' },
        { name: 'I4C - Indian Cyber Crime Centre', url: 'https://i4c.mha.gov.in/' },
    ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Access */}
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

            {/* V V V THIS IS THE NEW NEWS CAROUSEL V V V */}
            <Card className="lg:col-span-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-primary flex items-center gap-2">
                        <Newspaper className="h-5 w-5" />
                        Latest News
                    </CardTitle>
                    <CardDescription>Updates from the society</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                    <Carousel
                        className="w-full max-w-xs"
                        plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
                        opts={{ loop: true }}
                    >
                        <CarouselContent>
                            {newsData.map((news) => (
                                <CarouselItem key={news.id}>
                                    <Link to={`/news#${news.id}`}>
                                        <Card className="overflow-hidden">
                                            <CardContent className="flex flex-col items-center justify-center p-0">
                                                <img src={news.image} alt={news.title} className="w-full h-40 object-cover" />
                                                <div className="p-4">
                                                    <h3 className="font-semibold mb-2">{news.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{news.summary}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
            </Card>


            {/* Useful Links */}
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