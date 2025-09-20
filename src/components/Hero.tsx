//  new, merged, and animated Hero.tsx file

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Phone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        // ANIMATION: Added 'relative' and 'overflow-hidden' for the background effects
        <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white py-16 lg:py-24 relative overflow-hidden">

            {/* ANIMATION: Added new floating background elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full animate-float"></div>
                <div className="absolute top-1/2 -right-32 w-64 h-64 bg-white/5 rounded-full animate-float" style={{ animationDelay: '-1s' }}></div>
                <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-white/5 rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
            </div>

            {/* ANIMATION: Added 'relative' and 'z-10' to ensure content is on top of the background */}
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* ANIMATION: Added fade-in animation to the heading */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-down">
                        Cyber Security Society of MATES
                    </h1>

                    {/* ANIMATION: Added fade-in animation to the mission statement */}
                    <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Our mission is to promote cyber awareness and ethical online behavior,
                        provide cybersecurity training, establish a response system for cybercrime victims,
                        develop technical expertise through student-led teams, and build a culture of truthfulness,
                        empathy, and responsibility in cyberspace.
                    </p>

                    {/* ANIMATION: Added fade-in animation to the button container */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        {/* ANIMATION: Added hover effects and pulse glow to the button */}
                        <Button
                            size="lg"
                            variant="secondary"
                            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse-glow"
                            asChild
                        >
                            <Link to="/portal">
                                <AlertTriangle className="mr-2 h-5 w-5" />
                                Report Cyber Attack
                            </Link>
                        </Button>

                        {/* ANIMATION: Added hover effects to the button */}
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white bg-transparent hover:bg-white hover:text-primary font-semibold px-8 py-4 transform hover:scale-105 transition-all duration-300"
                            asChild
                        >
                            <Link to="/helpline">
                                <Phone className="mr-2 h-5 w-5" />
                                Emergency Helpline
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        {/* ANIMATION: Added staggered fade-in, hover effects, and icon animation */}
                        <Card className="bg-white/10 backdrop-blur border-white/20 text-white animate-stagger-1 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                            <div className="p-6 text-center">
                                <Shield className="h-12 w-12 mx-auto mb-4 text-white animate-float" />
                                <h3 className="font-semibold mb-2">24/7 Response</h3>
                                <p className="text-sm text-white/80">Round-the-clock security monitoring and incident response</p>
                            </div>
                        </Card>

                        {/* ANIMATION: Added staggered fade-in, hover effects, and icon animation */}
                        <Card className="bg-white/10 backdrop-blur border-white/20 text-white animate-stagger-2 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                            <div className="p-6 text-center">
                                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-white animate-float" style={{ animationDelay: '-1s' }} />
                                <h3 className="font-semibold mb-2">Rapid Response</h3>
                                <p className="text-sm text-white/80">Immediate action protocols for critical security incidents</p>
                            </div>
                        </Card>

                        {/* ANIMATION: Added staggered fade-in, hover effects, and icon animation */}
                        <Card className="bg-white/10 backdrop-blur border-white/20 text-white animate-stagger-3 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                            <div className="p-6 text-center">
                                <Phone className="h-12 w-12 mx-auto mb-4 text-white animate-float" style={{ animationDelay: '-2s' }} />
                                <h3 className="font-semibold mb-2">Expert Support</h3>
                                <p className="text-sm text-white/80">Access to certified cybersecurity professionals</p>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;