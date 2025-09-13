import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, GraduationCap, Calendar, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Incident Response',
      description: 'Report security incidents and track their resolution through our comprehensive incident management system.',
      link: '/incident-response',
      available: true,
    },
    {
      icon: GraduationCap,
      title: 'Training',
      description: 'Enhance your cybersecurity knowledge with expert-led training programs and workshops.',
      link: '/training',
      available: false,
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Join cybersecurity events, webinars, and conferences to stay ahead of emerging threats.',
      link: '/events',
      available: false,
    },
    {
      icon: FileText,
      title: 'Guidelines',
      description: 'Access comprehensive security guidelines, best practices, and policy documentation.',
      link: '/guidelines',
      available: true,
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Security Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions designed to protect, educate, and respond to digital threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                {!feature.available && (
                  <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
                    Coming Soon
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-center mb-6">
                    {feature.description}
                  </CardDescription>
                  
                  <Button 
                    asChild 
                    variant={feature.available ? 'default' : 'secondary'} 
                    className="w-full group-hover:translate-x-1 transition-transform"
                    disabled={!feature.available}
                  >
                    <Link to={feature.link}>
                      {feature.available ? 'Access Now' : 'Learn More'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;