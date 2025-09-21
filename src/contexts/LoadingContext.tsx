import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the loading screen before
    const hasSeenLoading = sessionStorage.getItem('hasSeenCyberLoading');
    
    if (hasSeenLoading) {
      // If they've seen it in this session, don't show again
      setIsLoading(false);
    } else {
      // Show loading for first-time visitors or new sessions
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenCyberLoading', 'true');
      }, 5500); // Match the loading duration

      return () => clearTimeout(timer);
    }
  }, []);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
