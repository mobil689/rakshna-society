// Update this page (the content is just a fallback if you fail to update the page)

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LinkTray from '@/components/LinkTray';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <LinkTray />
      <Footer />
    </div>
  );
};

export default Index;
