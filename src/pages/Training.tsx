import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Clock, Users, Star, BookOpen, Video, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const Training = () => {
  const navigate = useNavigate();
  const upcomingWorkshops = [
    {
      title: 'Incident Response Planning',
      date: 'November 15, 2025',
      duration: '2 hours',
      level: 'Beginner',
      instructor: 'will be available soon',
      spots: '05 spots remaining'
    },
    {
      title: 'Introduction to Ethical Hacking',
      date: 'November 18, 2025',
      duration: '4 hours',
      level: 'Intermediate',
      instructor: 'will be available soon',
      spots: '38 spots remaining'
    },
    {
      title: 'Capture-the-Flag (CTF) Kickstart Competition',
      date: 'Coming soon',
      duration: '6 hours',
      level: 'Advanced',
      instructor: 'will be available soon',
      spots: '92 spots remaining'
    }
  ];

  const learningResources = [
    {
      icon: Video,
      title: 'Video Library',
      description: 'On-demand security training videos',
      count: '50+ videos',
      type: 'Free'
    },
    {
      icon: FileText,
      title: 'Cyber Law & Incident Reporting Guides',
      description: 'Comprehensive security guides',
      count: '50+ guides',
      type: 'Free'
    },
    {
      icon: BookOpen,
      title: 'Cyber Security Resources',
      description: 'Official guides, standards, and certification materials',
      count: '25+ resources',
      type: 'Free'
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
              <GraduationCap className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Cybersecurity Training</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Enhance your cybersecurity knowledge with expert-led training programs and comprehensive learning resources
              </p>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <Card className="mb-8 border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Training Content Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our comprehensive training platform is currently under development. We're working hard to bring you the best cybersecurity education experience.
              </p>
              <p className="font-medium mb-4">What's coming:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mb-6">
                <li>Interactive workshops and hands-on labs</li>
                <li>Official short-term certifications for students through I4C & CyTrain Modules.</li>
                <li>Live webinars with industry experts</li>
                <li>Fun,gamified learning events like Capture-the-Flag (CTF) competitions, simulations, and hackathons. </li>
                <li>Core skill-building in cyber hygiene, incident reporting, and forensic basics.</li>
              </ul>
              
              {/* Interest Registration */}
              <div className="bg-background p-4 rounded-lg border">
                <h3 className="font-semibold mb-4">Register Your Interest</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@company.com" />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      Register Interest
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Workshops Preview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWorkshops.map((workshop, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {workshop.date} • {workshop.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Level:</span>
                        <span className="text-sm">{workshop.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Instructor:</span>
                        <span className="text-sm">{workshop.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Availability:</span>
                        <span className="text-sm text-success">{workshop.spots}</span>
                      </div>
                      <Button className="w-full" variant="outline" disabled>
                        <Users className="mr-2 h-4 w-4" />
                        Registration Opening Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningResources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Content:</span>
                          <span className="text-sm">{resource.count}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Access:</span>
                          <span className={`text-sm font-medium ${resource.type === 'Free' ? 'text-success' : 'text-warning'}`}>
                            {resource.type}
                          </span>
                        </div>
                        {index === 0 ? (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => navigate('/video-library')}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            View Videos
                          </Button>
                        ) : index === 2 ? (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => navigate('/cyber-security-resources')}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Resources
                          </Button>
                        ) : (
                          <Button className="w-full" variant="outline" disabled>
                            <Star className="mr-2 h-4 w-4" />
                            Available Soon
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact for Custom Training */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Skill Development</CardTitle>
              <CardDescription>
                  Go beyond the basics and build career-ready skills with our specialized teams and workshops.              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">What we offer:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Specialized courses in ethical hacking, digital forensics, and cyber law.</li>
                    <li>• Hands-on experience by joining our student-led Red Team (Attack Simulation) and Blue Team (Defense).</li>
                    <li>• HParticipation in competitive events like Capture-the-Flag (CTF), simulations, and hackathons.</li>
                    <li>• Opportunities to gain short-term certifications through official I4C & CyTrain modules.
                    </li>
                    <li>• A clear pathway to develop skills for a career in cybersecurity.</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center">
                  <Button size="lg" className="w-full">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Join the Cyber Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Training;