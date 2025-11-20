import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portal from "./pages/Portal";
import IncidentResponse from "./pages/IncidentResponse";
import Training from "./pages/Training";
import VideoLibrary from "./pages/VideoLibrary";
import CyberSecurityResources from "./pages/CyberSecurityResources";
import Events from "./pages/Events";
import Helpline from "./pages/Helpline";
import Login from "./pages/Login";
import Guidelines from "./pages/Guidelines";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import TermsModal from "./components/TermsModal";
import CyberLoading from "./components/CyberLoading";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
// import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <CyberLoading />}
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/incident-response" element={<IncidentResponse />} />
          <Route path="/training" element={<Training />} />
          <Route path="/video-library" element={<VideoLibrary />} />
          <Route path="/cyber-security-resources" element={<CyberSecurityResources />} />
          <Route path="/events" element={<Events />} />
          <Route path="/helpline" element={<Helpline />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TermsModal />
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
