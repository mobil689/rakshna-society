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

      {/*      /!* News Bulletin Section *!/*/}
      {/*      <section className="py-6 bg-background">*/}
      {/*          <div className="container mx-auto px-4">*/}
      {/*              <div className="flex items-center border rounded-lg overflow-hidden">*/}
      {/*<span className="bg-primary text-primary-foreground font-bold px-4 py-3 text-sm flex-shrink-0">*/}
      {/*  Latest News*/}
      {/*</span>*/}
      {/*                  <div className="relative flex-1 h-full overflow-hidden">*/}
      {/*                      <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">*/}
      {/*                          /!* We render the list twice for a seamless, infinite loop *!/*/}
      {/*                          {newsItems.map((item, index) => (*/}
      {/*                              <span key={index} className="mx-6 text-gray-800 dark:text-gray-300">*/}
      {/*        {item}*/}
      {/*      </span>*/}
      {/*                          ))}*/}
      {/*                          {newsItems.map((item, index) => (*/}
      {/*                              <span key={`dup-${index}`} className="mx-6 text-gray-800 dark:text-gray-300">*/}
      {/*        {item}*/}
      {/*      </span>*/}
      {/*                          ))}*/}
      {/*                      </div>*/}
      {/*                  </div>*/}
      {/*              </div>*/}
      {/*          </div>*/}
      {/*      </section>*/}

            <Features />
            <LinkTray />
            <Footer />
        </div>
    );
};

export default Index;