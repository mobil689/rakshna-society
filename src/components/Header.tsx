// Your new, merged, and animated Header.tsx file

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Your navItems array is already correct with the "News" link
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Incident Portal', path: '/portal' },
        { name: 'Training', path: '/training' },
        { name: 'Events', path: '/events' },
        { name: 'News', path: '/news' },
        { name: 'Helpline', path: '/helpline' },
        { name: 'Guidelines', path: '/guidelines' }
    ];

    return (
        // ANIMATION: Added fade-in animation and updated blur effect
        <header className="bg-background/95 border-b border-border sticky top-0 z-50 backdrop-blur-md animate-fade-in-down">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    {/* ANIMATION: Added hover effects to the logo link */}
                    <Link to="/" className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300">
                        {/* ANIMATION: Added hover effect to the logo image - Increased size */}
                        <img src="/rakshna-logo.png" alt="RAKSHNA Logo" className="h-18 w-18" />

                        {/* ANIMATION: Added shimmer effect to the text - Moved right with more spacing */}
                        <span className="text-2xl font-bold text-primary relative ml-3">
                    RAKSHNA
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary opacity-0 group-hover:opacity-20 animate-shimmer"></div>
                </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item, index) => (
                            // ANIMATION: Added hover effects and staggered fade-in
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group transform hover:scale-105 animate-fade-in-down"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {item.name}
                                {/* ANIMATION: Added animated underline */}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Login/Register Buttons - Moved left with increased logo size */}
                    <div className="hidden md:flex items-center space-x-3 mr-4">
                        {/* ANIMATION: Added hover effect */}
                        <Button variant="ghost" className="transform hover:scale-105 transition-all duration-300" asChild>
                            <Link to="/login">Login</Link>
                        </Button>
                        {/* ANIMATION: Added hover effects and pulse glow */}
                        <Button variant="default" className="transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse-glow" asChild>
                            <Link to="/register">Register</Link>
                        </Button>

                        {/* Increased MAIT logo size */}
                        <img src="/mait-logo.png" alt="MAIT Logo" className="h-14" />
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    // ANIMATION: Added slide-up animation to the menu container
                    <div className="md:hidden mt-4 pb-4 border-t border-border animate-slide-up">
                        <nav className="flex flex-col space-y-4 mt-4">
                            {navItems.map((item, index) => (
                                // ANIMATION: Added hover effect and staggered fade-in
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-muted-foreground hover:text-primary transition-colors transform hover:translate-x-2 animate-fade-in-left"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col items-center space-y-2 pt-4 border-t border-border">
                                {/* I also added your college logo to the mobile menu for consistency - Increased size */}
                                <img src="/mait-logo.png" alt="MAIT Logo" className="h-12 mb-2" />
                                <Button variant="ghost" className="w-full" asChild>
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button variant="default" className="w-full" asChild>
                                    <Link to="/register">Register</Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;