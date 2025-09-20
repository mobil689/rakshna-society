//  new, merged, and animated Features.tsx file

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
        // ANIMATION: Added 'relative' and 'overflow-hidden'
        <section className="py-16 bg-secondary/30 relative overflow-hidden">
            {/* ANIMATION: Added a skewed background gradient element */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-y-1"></div>

            {/* ANIMATION: Added 'relative' and 'z-10' to ensure content is on top */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    {/* ANIMATION: Added fade-in animation */}
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
                        Security Services
                    </h2>
                    {/* ANIMATION: Added fade-in animation with a delay */}
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Comprehensive cybersecurity solutions designed to protect, educate, and respond to digital threats
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        // ANIMATION: Define a staggered animation class for each card
                        const animationClass = `animate-stagger-${index + 1}`;
                        return (
                            // ANIMATION: Added new animation and hover effect classes
                            <Card key={feature.title} className={`relative overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 ${animationClass}`}>
                                {!feature.available && (
                                    <Badge className="absolute top-4 right-4 bg-warning text-warning-foreground">
                                        Coming Soon
                                    </Badge>
                                )}

                                {/* ANIMATION: Added a shimmer effect that appears on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300"></div>

                                <CardHeader className="text-center relative z-10">
                                    {/* ANIMATION: Added hover effects to the icon container */}
                                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-all duration-300 transform group-hover:rotate-12">
                                        {/* ANIMATION: Added hover effect to the icon */}
                                        <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    {/* ANIMATION: Added hover effect to the title */}
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <CardDescription className="text-center mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                                        {feature.description}
                                    </CardDescription>

                                    {/* ANIMATION: Added hover effects to the button and arrow icon */}
                                    <Button
                                        asChild
                                        variant={feature.available ? 'default' : 'secondary'}
                                        className="w-full transform transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg"
                                        disabled={!feature.available}
                                    >
                                        <Link to={feature.link}>
                                            {feature.available ? 'Access Now' : 'Learn More'}
                                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
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