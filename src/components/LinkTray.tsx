import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Calendar, ExternalLink, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        { name: 'I4C - Indian Cyber Crime Centre', url: 'https://i4c.gov.in/' },
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

          {/* Search */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-primary">Search Resources</CardTitle>
              <CardDescription>Find security information quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search topics, guidelines, alerts..." 
                  className="pl-10"
                />
              </div>
              <Button variant="default" className="w-full">
                Search Knowledge Base
              </Button>
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