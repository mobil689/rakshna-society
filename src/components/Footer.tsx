// Your new, merged, and animated Footer.tsx file

import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        // ANIMATION: Added relative, overflow-hidden
        <footer className="bg-primary text-primary-foreground relative overflow-hidden">
            {/* ANIMATION: Added animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-90"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-light to-transparent animate-shimmer"></div>

            {/* ANIMATION: Added relative, z-10 */}
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand & Contact */}
                    {/* ANIMATION: Added fade-in animation */}
                    <div className="space-y-4 animate-fade-in-up">
                        {/* ANIMATION: Added group class for hover effects */}
                        <div className="flex items-center space-x-2 group">
                            {/* ANIMATION: Added floating and hover effects */}
                            <img src="/rakshna-logo.png" alt="RAKSHNA Logo" className="h-8 w-8 animate-float group-hover:rotate-12 transition-transform duration-300" />
                            <span className="text-xl font-bold">RAKSHNA</span>
                        </div>
                        <p className="text-primary-foreground/80">
                            Protecting digital assets through comprehensive cybersecurity solutions and rapid incident response.
                        </p>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>Emergency: 1930</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4" />
                                <span>rakshana.mait@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>MAIT ,Sec 22, PSP Area, Delhi, 110086</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    {/* ANIMATION: Added fade-in animation with delay */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            {/* ANIMATION: Added hover effects */}
                            <li><Link to="/portal" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Report Incident</Link></li>
                            <li><Link to="/helpline" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Emergency Helpline</Link></li>
                            <li><Link to="/guidelines" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Security Guidelines</Link></li>
                            <li><Link to="/training" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Training Resources</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    {/* ANIMATION: Added fade-in animation with delay */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3 className="text-lg font-semibold">Resources</h3>
                        <ul className="space-y-2">
                            {/* ANIMATION: Added hover effects */}
                            <li><Link to="/incident-response" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Incident Response</Link></li>
                            <li><Link to="/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Security Events</Link></li>
                            <li><Link to="/handbook" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Security Handbook</Link></li>
                            <li><Link to="/webstream" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Live Webinars</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Connect */}
                    {/* ANIMATION: Added fade-in animation with delay */}
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-lg font-semibold">Legal & Connect</h3>
                        <ul className="space-y-2">
                            {/* ANIMATION: Added hover effects */}
                            <li><Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Terms of Service</Link></li>
                            <li><Link to="/accessibility" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Accessibility</Link></li>
                            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-all duration-300 transform hover:translate-x-1 inline-block">Contact Us</Link></li>
                        </ul>

                        <div className="flex space-x-3 pt-4">
                            {/* ANIMATION: Added hover effects to all social media buttons */}
                            <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 hover:-translate-y-1 transition-all duration-300" asChild>
                                <a href="https://twitter.com/Rakshna" target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 hover:-translate-y-1 transition-all duration-300" asChild>
                                <a href="https://linkedin.com/company/rakshana-mait" target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground transform hover:scale-110 hover:-translate-y-1 transition-all duration-300" asChild>
                                <a href="https://www.instagram.com/rakshnamait" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-light mt-8 pt-8 text-center text-sm text-primary-foreground/60">
                    <p>&copy; 2025 Rakshna. All rights reserved. | CyberSecurity Society of Mates.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;