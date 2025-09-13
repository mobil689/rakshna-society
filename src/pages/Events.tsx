import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Events = () => {
  const [selectedMonth, setSelectedMonth] = useState('March 2024');
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Cybersecurity Awareness Workshop',
      date: 'March 15, 2024',
      time: '10:00 AM - 12:00 PM EST',
      location: 'Virtual Event',
      type: 'Workshop',
      spots: 45,
      maxSpots: 50,
      description: 'Learn essential cybersecurity practices for small businesses and individuals.',
    },
    {
      id: 2,
      title: 'Incident Response Drill',
      date: 'March 22, 2024', 
      time: '2:00 PM - 5:00 PM EST',
      location: 'Washington, DC',
      type: 'Training',
      spots: 12,
      maxSpots: 20,
      description: 'Hands-on simulation exercise for incident response teams.',
    },
    {
      id: 3,
      title: 'Threat Intelligence Briefing',
      date: 'April 5, 2024',
      time: '1:00 PM - 2:30 PM EST', 
      location: 'Virtual Event',
      type: 'Briefing',
      spots: 120,
      maxSpots: 150,
      description: 'Monthly briefing on current threat landscape and emerging risks.',
    }
  ];

  const pastEvents = [
    {
      title: 'Annual Cybersecurity Summit',
      date: 'February 14-16, 2024',
      location: 'San Francisco, CA',
      attendees: 2500,
      type: 'Conference'
    },
    {
      title: 'Ransomware Prevention Webinar', 
      date: 'January 25, 2024',
      location: 'Virtual Event',
      attendees: 850,
      type: 'Webinar'
    }
  ];

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
              <p className="text-muted-foreground">
                We're preparing an enhanced event management system with registration capabilities, waitlists, and calendar integration. Stay tuned for updates!
              </p>
            </CardContent>
          </Card>

          {/* Calendar Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Mini Calendar */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Event Calendar</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{selectedMonth}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-medium text-muted-foreground p-2">{day}</div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div key={day} className={`p-2 hover:bg-accent rounded cursor-pointer ${
                      [15, 22].includes(day) ? 'bg-primary text-primary-foreground font-medium' : ''
                    }`}>
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Upcoming Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">2,847</div>
                    <div className="text-sm text-muted-foreground">Total Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">8</div>
                    <div className="text-sm text-muted-foreground">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <div className="text-sm text-muted-foreground">Virtual Events</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                      
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{event.type}</Badge>
                          <Badge variant={event.location === 'Virtual Event' ? 'outline' : 'default'}>
                            {event.location}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-muted-foreground text-sm">{event.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
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
                        <Button 
                          className="w-full" 
                          disabled={event.spots >= event.maxSpots}
                        >
                          {event.spots >= event.maxSpots ? 'Event Full' : 'Register Soon'}
                        </Button>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events Archive */}
          <Card>
            <CardHeader>
              <CardTitle>Past Events Archive</CardTitle>
              <CardDescription>Review our previous cybersecurity events and their outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{event.type}</Badge>
                      <Button variant="ghost" size="sm">
                        View Summary
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;