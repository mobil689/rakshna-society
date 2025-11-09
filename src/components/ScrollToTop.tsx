// This component forces the page to scroll to the top on every route change

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // Get the current page's URL (pathname)
    const { pathname } = useLocation();

    // This 'effect' runs every time the 'pathname' changes
    useEffect(() => {
        // Scroll the window to the top left corner (0, 0)
        window.scrollTo(0, 0);
    }, [pathname]); // The effect's dependency is the pathname

    // This component doesn't render any visible HTML
    return null;
};

export default ScrollToTop;