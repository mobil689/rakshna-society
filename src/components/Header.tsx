// Your new, merged, and animated Header.tsx file

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated, displayName, signOut, isLoading } = useAuth();

    // Close user dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
        toast.success('Signed out successfully');
    };

    // Your navItems array is already correct with the "News" link
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Incident Portal', path: '/portal' },
        { name: 'Training', path: '/training' },
        { name: 'Events', path: '/events' },
        { name: 'News', path: '/news' },
        { name: 'Blog', path: '/blog' },
        { name: 'Helpline', path: '/helpline' },
        { name: 'Guidelines', path: '/guidelines' },
        { name: 'Meet the Team', path: '/team' }
    ];

    // User avatar button + dropdown (shared between desktop and mobile)
    const UserDropdown = ({ isMobile = false }: { isMobile?: boolean }) => {
        if (isLoading) {
            return (
                <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
            );
        }

        if (!isAuthenticated) {
            return (
                <>
                    <Button variant="ghost" className={`transform hover:scale-105 transition-all duration-300 ${isMobile ? 'w-full' : ''}`} asChild>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="default" className={`transform hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse-glow ${isMobile ? 'w-full' : ''}`} asChild>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                    </Button>
                </>
            );
        }

        if (isMobile) {
            return (
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-primary/5 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{displayName}</p>
                            <p className="text-xs text-muted-foreground">Signed in</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleSignOut}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            );
        }

        // Desktop user dropdown
        return (
            <div className="relative" ref={userMenuRef}>
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 group"
                    title={displayName}
                >
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold transition-transform group-hover:scale-105">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-1 animate-fade-in-down z-[60]">
                        <div className="px-4 py-3 border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                                    {displayName.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">{displayName}</p>
                                    <p className="text-xs text-muted-foreground">Member</p>
                                </div>
                            </div>
                        </div>
                        <div className="py-1">
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        // ANIMATION: Added fade-in animation and updated blur effect
        <header className="bg-background/95 border-b border-border sticky top-0 z-50 backdrop-blur-md animate-fade-in-down">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    {/* ANIMATION: Added hover effects to the logo link */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        {/* Fixed logo size and removed hover scale/rotation */}
                        <img src="/rakshna-logo.png" alt="RAKSHNA Logo" className="h-16 w-16" />

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

                    {/* Auth Buttons / User Menu - Desktop */}
                    <div className="hidden md:flex items-center space-x-3 mr-4">
                        <UserDropdown />
                        {/* Normalized MAIT logo size */}
                        <img src="/mait-logo.png" alt="MAIT Logo" className="h-16" />
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
                                <UserDropdown isMobile />
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;