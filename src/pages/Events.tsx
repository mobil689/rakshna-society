import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight,
  Calendar as CalendarIcon, X, FileText
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  date: Date;
  location: string;
  type: string;
  spots: string;
  maxSpots: string;
  description: string;
  posterUrl?: string; 
  details?: React.ReactNode;
  registrationLink?: string;
  galleryLink?: string; // <-- NEW: Link to the gallery page
}

// --- ONGOING EVENTS ---
const ongoingEvents: Event[] = [
  {
    id: 3,
    title: 'Rakshna Recruitment Tasks',
    date: new Date(), 
    location: 'Online',
    type: 'Recruitment',
    spots: "N/A", 
    maxSpots: "N/A",
    description: 'Complete the tasks to join Rakshna Society. Download the challenges and submit your flags.',
    posterUrl: '/rakshna-logo.png', // Using the Rakshna Logo
    details: (
      <div className="space-y-6">
        <div className="p-4 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Tasks
            </h3>
            <p className="mb-4 text-muted-foreground">
                Download the challenge zip file containing the recruitment tasks.
                <br/>
                <span className="text-xs italic">Note: Extract the zip file on your pc and solve the tasks.</span>
            </p>
            <Button asChild>
                <a href="https://github.com/mobil689/rakshna-society/raw/84c2adeb6b3d3ba5b7b8c3a2793b8d85816f2004/Rakshna_Recruitment_Task.zip" target="_blank" rel="noopener noreferrer">
                    Download Tasks (Zip)
                </a>
            </Button>
        </div>

        <div className="p-4 border rounded-lg bg-muted/20">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Submit the Flags
            </h3>
            <p className="mb-4 text-muted-foreground">
                Once you have solved the challenges, submit your flags via the Google Form below.
            </p>
            <Button asChild>
                <a href="https://forms.gle/NDC1VpoBFzSPdV968" target="_blank" rel="noopener noreferrer">
                    Go to Submission Form
                </a>
            </Button>
        </div>
      </div>
    )
  }
];

// --- PAST EVENTS (Moved Inauguration here) ---
const pastEvents: Event[] = [
  {
    id: 2,
    title: 'RAKSHNA Inauguration Ceremony',
    date: new Date('2025-11-10T11:00:00'),
    location: 'Main Auditorium, MAIT',
    type: 'Inauguration',
    spots: "280",
    maxSpots: "400",
    description: 'The official inauguration of the RAKSHNA Cyber Security Society.',
    posterUrl: 'https://placehold.co/600x400/1f2937/ffffff?text=RAKSHNA+Poster', 
    galleryLink: '/events/gallery/rakshna-inauguration-report', // <-- LINK TO NEW PAGE
    details: (
        <div className="space-y-4 whitespace-pre-line">
            <p className="font-bold text-lg">🔵 RAKSHNA – The Cybersecurity Society of MAIT 🔵</p>
            <p>Event successfully concluded. Please view the gallery and report.</p>
        </div>
    )
  },
  {
    id: 1,
    title: 'The Working of the society',
    date: new Date('2025-09-17T10:00:00'),
    location: 'BLOCK 11, MAIT',
    type: 'Group Discussion',
    spots: "20",
    maxSpots: "50",
    description: 'Discussing about the upcoming future and strengthening the society',
    posterUrl: 'https://placehold.co/600x400/1f2937/ffffff?text=Event+Poster',
    details: (
      <div className="space-y-4">
        <p>Past event.</p>
      </div>
    )
  }
];

const Events = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); 
  
  const today = new Date();
  const now = new Date(); 
  
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const eventDays = useMemo(() => {
    const days = new Set<number>();
    const allEvents = [...ongoingEvents, ...pastEvents];
    for (const event of allEvents) {
      if (event.date.getMonth() === currentMonth && event.date.getFullYear() === currentYear) {
        days.add(event.date.getDate());
      }
    }
    return days;
  }, [currentMonth, currentYear]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-lg text-white mb-8">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Security Events & Webinars</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Join cybersecurity events, workshops, and training sessions to enhance your knowledge and network with experts
              </p>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <Card className="mb-8 border-warning bg-warning/5">
             <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Event Registration Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We're preparing an enhanced event management system with registration capabilities, waitlists, and calendar integration. Stay tuned for updates!</p>
            </CardContent>
          </Card>

          {/* Calendar Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Event Calendar</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={handlePrevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={handleNextMonth}><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                </CardHeader>
                <CardDescription className="px-6">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </CardDescription>
                <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm mt-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="font-medium text-muted-foreground p-2">{day}</div>
                        ))}
                        {calendarDays.map((day, index) => {
                            if (day === null) return <div key={`empty-${index}`}></div>;
                            const isEventDay = eventDays.has(day);
                            return (
                                <div key={day} className={`p-2 rounded cursor-pointer transition-colors ${isEventDay ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-accent'}`}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
             </Card>
             <Card className="lg:col-span-2">
                <CardHeader><CardTitle>Event Statistics</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{ongoingEvents.length}</div>
                            <div className="text-sm text-muted-foreground">Ongoing</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-success">250+</div>
                            <div className="text-sm text-muted-foreground">Participants</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-warning">{pastEvents.length}</div>
                            <div className="text-sm text-muted-foreground">Past Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-destructive">0</div>
                            <div className="text-sm text-muted-foreground">Virtual</div>
                        </div>
                    </div>
                </CardContent>
             </Card>
          </div>

          {/* ONGOING EVENTS */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">ongoing Events</h2>
            {ongoingEvents.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed rounded-xl bg-muted/30">
                    <p className="text-muted-foreground">No ongoing events scheduled. Check back soon!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {ongoingEvents.map((event) => (
                        <Card key={event.id} className="border-primary/20 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 text-sm">
                                                {event.type}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                                                <CalendarIcon className="h-4 w-4"/>
                                                {event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </span>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                {event.location}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-primary" />
                                                {event.spots} / {event.maxSpots} Spots
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center gap-3 min-w-[200px]">
                                        <Button size="lg" onClick={() => setSelectedEvent(event)} className="w-full shadow-md hover:shadow-lg transition-all">
                                            View Details & Tasks
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
          </div>

          {/* PAST EVENTS */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Past Events Archive</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Event History</CardTitle>
                    <CardDescription>Browse summaries and details from our past events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {pastEvents.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg gap-4">
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="secondary">{event.type}</Badge>
                                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                                        <CalendarIcon className="h-3 w-3"/>
                                        {event.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-lg">{event.title}</h4>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                {/* --- GALLERY BUTTON --- */}
                                {event.galleryLink && (
                                    <Button asChild className="flex-1 md:flex-none gap-2">
                                        <Link to={event.galleryLink}>
                                            <FileText className="h-4 w-4" />
                                            View Gallery
                                        </Link>
                                    </Button>
                                )}
                                <Button variant="outline" onClick={() => setSelectedEvent(event)} className="flex-1 md:flex-none">
                                    Quick View
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>

        </div>
      </main>
      
      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{selectedEvent.description}</DialogDescription>

              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="md:col-span-2 prose dark:prose-invert max-w-none">
                    {selectedEvent.details}
                </div>
                <div className="md:col-span-1">
                    <img src={selectedEvent.posterUrl} alt="Poster" className="w-full rounded-lg shadow-md mb-4" />
                    <Card className="bg-muted/50"><CardContent className="p-4 space-y-2">
                        <div className="flex gap-2 text-sm"><Clock className="h-4 w-4"/> {selectedEvent.date.toLocaleTimeString()}</div>
                        <div className="flex gap-2 text-sm"><MapPin className="h-4 w-4"/> {selectedEvent.location}</div>
                    </CardContent></Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Events;