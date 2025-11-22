import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ChevronLeft, ChevronRight, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { sanityClient } from '@/lib/sanityClient'; // Import Sanity Client
import imageUrlBuilder from '@sanity/image-url'; // Import Image Builder
import { PortableText } from '@portabletext/react'; // Import Text Renderer

// --- Sanity Image Helper ---
const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

// --- Interface for Sanity Data ---
interface EventGalleryData {
  _id: string;
  title: string;
  date: string;
  location: string;
  images: any[];
  report: any[];
}

const EventGallery = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [eventData, setEventData] = useState<EventGalleryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      setIsLoading(true);
      try {
        // Query Sanity for the event with the matching slug
        const query = `*[_type == "eventGallery" && slug.current == $slug][0] {
          _id,
          title,
          date,
          location,
          images,
          report
        }`;
        
        const data = await sanityClient.fetch(query, { slug });
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [slug]);

  // Auto-advance slider logic
  useEffect(() => {
    if (!eventData || !eventData.images || eventData.images.length === 0) return;
    
    const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % eventData.images.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [eventData]);

  const nextSlide = () => {
    if (eventData?.images) {
        setCurrentSlide((prev) => (prev + 1) % eventData.images.length);
    }
  };

  const prevSlide = () => {
    if (eventData?.images) {
        setCurrentSlide((prev) => (prev - 1 + eventData.images.length) % eventData.images.length);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-background"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  if (!eventData) {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-background gap-4">
            <h2 className="text-2xl font-bold">Event Report Not Found</h2>
            <Button asChild><Link to="/events">Back to Events</Link></Button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Navigation */}
          <Button asChild variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all">
            <Link to="/events" className="flex items-center text-muted-foreground hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>

          {/* --- TOP SECTION: AUTOMATIC IMAGE SLIDER --- */}
          {eventData.images && eventData.images.length > 0 ? (
            <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-12 group bg-black border-4 border-background ring-1 ring-border/50">
                
                {eventData.images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <img 
                            src={urlFor(img).width(1200).height(800).url()} 
                            alt={`Slide ${index + 1}`} 
                            className="w-full h-full object-contain bg-black/90" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                ))}

                {/* Slider Controls (Only if more than 1 image) */}
                {eventData.images.length > 1 && (
                    <>
                        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10">
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {eventData.images.map((_, idx) => (
                                <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    idx === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
                                }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-muted rounded-xl mb-12">
                <p className="text-muted-foreground">No images available for this event.</p>
            </div>
          )}

          {/* --- BOTTOM SECTION: REPORT TEXT --- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Main Report Content */}
            <div className="md:col-span-8">
                <div className="mb-8 border-b pb-6">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground leading-tight">{eventData.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>{new Date(eventData.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        {eventData.location && (
                            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /><span>{eventData.location}</span></div>
                        )}
                    </div>
                </div>

                {/* REPORT BODY - RENDERED FROM SANITY RICH TEXT */}
                <div className="prose dark:prose-invert max-w-none marker:text-primary text-muted-foreground text-lg leading-relaxed">
                    <PortableText value={eventData.report} />
                </div>
            </div>

            {/* Sidebar Info */}
            <div className="md:col-span-4 space-y-6">
                <Card className="bg-muted/30 border-none sticky top-24">
                    <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-6 text-foreground">Event Details</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between items-center border-b border-border/50 pb-3">
                                <span className="text-muted-foreground">Date</span>
                                <span className="font-medium">{new Date(eventData.date).toLocaleDateString()}</span>
                            </li>
                            {eventData.location && (
                                <li className="flex justify-between items-center border-b border-border/50 pb-3">
                                    <span className="text-muted-foreground">Location</span>
                                    <span className="font-medium text-right">{eventData.location}</span>
                                </li>
                            )}
                            {eventData.images && (
                                <li className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Gallery</span>
                                    <span className="font-medium">{eventData.images.length} Photos</span>
                                </li>
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventGallery;