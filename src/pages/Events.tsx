// The new, fully dynamic version of src/pages/Events.tsx
// (With "Learn More" Modal and automatic "Registration Ended" logic)

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight,
    Calendar as CalendarIcon, X
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

// --- (NEW) Event Interface ---
// We define a type for our event objects
interface Event {
    id: number;
    title: string;
    date: Date;
    location: string;
    type: string;
    spots: number;
    maxSpots: number;
    description: string;
    posterUrl?: string; // For the event poster
    details?: React.ReactNode; // For the detailed modal body
}

// --- (NEW) Event Data ---
// I've added the posterUrl and details to your events
const upcomingEvents: Event[] = [
    {
        id: 1,
        title: 'The Working of the society',
        date: new Date('2025-09-17T10:00:00'), // This date is in the past
        location: 'BLOCK 11, MAIT',
        type: 'Group Discussion',
        spots: 20,
        maxSpots: 50,
        description: 'Discussing about the upcoming future and strengthening the society',
        posterUrl: 'https://placehold.co/600x400/1f2937/ffffff?text=Event+Poster', // Placeholder
        details: (
            <div className="space-y-4">
                <p>A detailed discussion about the future roadmap, upcoming projects, and core structure of the RAKSHNA society.</p>
                <h4 className="font-semibold">Agenda:</h4>
                <ul className="list-disc list-inside">
                    <li>Review of society mission</li>
                    <li>Brainstorming for future workshops</li>
                    <li>Team-building exercises</li>
                </ul>
            </div>
        )
    },
    {
        id: 2,
        title: 'RAKSHNA Inauguration Ceremony',
        date: new Date('2025-11-10T11:00:00'), // This date is in the future
        location: 'Main Auditorium, MAIT',
        type: 'Inauguration',
        spots: 150,
        maxSpots: 200,
        description: 'The official inauguration of the RAKSHNA Cyber Security Society.',
        posterUrl: 'https://github.com/mobil689/rakshna-society/blob/main/rakshnnnnaa.jpg', // Placeholder
        // --- (NEW) Your full event details ---
        details: (
            <div className="space-y-4 whitespace-pre-line">
                <p className="font-bold text-lg">🔵 RAKSHNA – The Cybersecurity Society of MAIT 🔵</p>
                <p>We’re thrilled to announce the Grand Inauguration of RAKSHNA, MAIT’s official Cybersecurity Society!</p>

                <p className="font-semibold">👉 Mandatory Registration:
                    <a href="https://forms.gle/JjMweAWXJjcGZJ6A9" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                        https://forms.gle/JjMweAWXJjcGZJ6A9
                    </a>
                </p>

                <h4 className="font-semibold">What will you get 🔐</h4>
                <ul className="list-none space-y-2">
                    <li>⿡ Learn by doing! hands-on labs and guided projects, CTFs, hackathons, and cyber drills 💻</li>
                    <li>⿢ Build your future! Collaborate with industry experts, government bodies, and law enforcement to become the next-gen Cybersecurity Leader. 🔐</li>
                    <li>⿣ Official society 3 credits 🤫</li>
                </ul>

                <h4 className="font-semibold">📲 Follow us :</h4>
                <ul className="list-none">
                    <li>
                        🌐 Instagram – <a href="https://www.instagram.com/rakshnamait/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        https://www.instagram.com/rakshnamait/
                    </a>
                    </li>
                    <li>
                        💼 LinkedIn – <a href="https://www.linkedin.com/company/rakshna-mait/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        https://www.linkedin.com/company/rakshna-mait/
                    </a>
                    </li>
                </ul>


            </div>
        )
    },
];

const pastEvents: Event[] = [
    // ...
];
// --- (END NEW) Event Data ---


const Events = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // --- (NEW) State for modal

    const today = new Date();
    const now = new Date(); // --- (NEW) For checking event status

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const eventDays = useMemo(() => {
        const days = new Set<number>();
        for (const event of upcomingEvents) {
            if (event.date.getMonth() === currentMonth && event.date.getFullYear() === currentYear) {
                days.add(event.date.getDate());
            }
        }
        return days;
    }, [currentMonth, currentYear]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-8">
                <div className="container mx-auto px-4">
                    {/* Hero Section (Unchanged) */}
                    <div className="text-center mb-12">
                        <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-lg text-white mb-8">
                            <Calendar className="h-16 w-16 mx-auto mb-4" />
                            <h1 className="text-4xl font-bold mb-4">Security Events & Webinars</h1>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto">
                                Join cybersecurity events, workshops, and training sessions to enhance your knowledge and network with experts
                            </p>
                        </div>
                    </div>

                    {/* Coming Soon Notice (Unchanged) */}
                    <Card className="mb-8 border-warning bg-warning/5">{/* ... */}</Card>

                    {/* Calendar Interface (Unchanged) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* ... Dynamic Mini Calendar ... */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Event Calendar</CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardDescription>
                                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="font-medium text-muted-foreground p-2">{day}</div>
                                    ))}

                                    {calendarDays.map((day, index) => {
                                        if (day === null) {
                                            return <div key={`empty-${index}`}></div>;
                                        }

                                        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                                        const isEventDay = eventDays.has(day);

                                        return (
                                            <div
                                                key={day}
                                                className={`p-2 rounded cursor-pointer transition-colors ${
                                                    isEventDay ? 'bg-primary text-primary-foreground font-medium hover:bg-primary/90' :
                                                        isToday ? 'bg-blue-100 text-blue-800 font-medium hover:bg-blue-200' :
                                                            'hover:bg-accent'
                                                }`}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* --- (Dynamic Quick Stats - Unchanged) --- */}
                        <Card className="lg:col-span-2">{/* ... */}</Card>
                    </div>

                    {/* --- (NEW) DYNAMIC Upcoming Events --- */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Events</h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((event) => {

                                const locationVariant: "outline" | "default" =
                                    event.location === 'Virtual Event' ? 'outline' : 'default';

                                // --- (NEW) Check if the event is in the past ---
                                const isPastEvent = event.date < now;

                                return (
                                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">

                                                <div className="lg:col-span-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Badge variant="secondary">{event.type}</Badge>
                                                        <Badge variant={locationVariant}>
                                                            {event.location}
                                                        </Badge>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                                    <p className="text-muted-foreground text-sm">{event.description}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.spots} / {event.maxSpots} spots</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2">
                                                    {/* --- (NEW) Dynamic Button Logic --- */}
                                                    {isPastEvent ? (
                                                        <Button className="w-full" variant="secondary" disabled>
                                                            Registration Ended
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            className="w-full"
                                                            disabled={event.spots >= event.maxSpots}
                                                        >
                                                            {event.spots >= event.maxSpots ? 'Event Full' : 'Register Soon'}
                                                        </Button>
                                                    )}

                                                    {/* --- (NEW) Learn More Button --- */}
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => setSelectedEvent(event)}
                                                    >
                                                        Learn More
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    {/* Past Events Archive (Unchanged) */}
                    <Card>{/* ... */}</Card>
                </div>
            </main>

            {/* --- (NEW) Event Details Modal --- */}
            <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedEvent && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold">{selectedEvent.title}</DialogTitle>
                                <DialogDescription className="text-lg text-muted-foreground">{selectedEvent.description}</DialogDescription>
                                <button
                                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                                    onClick={() => setSelectedEvent(null)}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </DialogHeader>

                            {/* This is the layout from your diagram */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">

                                {/* Left Column (Body) */}
                                <div className="md:col-span-2">
                                    <h3 className="font-bold text-xl mb-4 text-primary">Event Details</h3>
                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                        {selectedEvent.details}
                                    </div>
                                </div>

                                {/* Right Column (Poster & Info) */}
                                <div className="md:col-span-1 space-y-4">
                                    <div>
                                        <h3 className="font-bold text-xl mb-4 text-primary">Event Poster</h3>
                                        <img
                                            src={selectedEvent.posterUrl}
                                            alt="Event Poster"
                                            className="w-full rounded-lg shadow-md"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/600x400/1f2937/ffffff?text=Poster+Not+Available';
                                            }}
                                        />
                                    </div>
                                    <Card className="bg-muted/50">
                                        <CardHeader>
                                            <CardTitle>Info</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                                <span>{selectedEvent.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>{selectedEvent.date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>{selectedEvent.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span>{selectedEvent.spots} / {selectedEvent.maxSpots} spots</span>
                                            </div>
                                        </CardContent>
                                    </Card>
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