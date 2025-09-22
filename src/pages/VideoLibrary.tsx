import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Clock, Users, Play } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const VideoLibrary = () => {
  const navigate = useNavigate();

  const videoCategories = [
    {
      title: 'Cybersecurity Fundamentals',
      videos: [
        {
          title: 'Introduction to Cybersecurity',
          description: 'Learn the basics of cybersecurity, including key concepts, threats, and protective measures.',
          duration: '15:30',
          views: '2.3M',
          thumbnail: 'https://img.youtube.com/vi/inWWhr5tnEA/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
          level: 'Beginner'
        },
        {
          title: 'Network Security Basics',
          description: 'Understanding network security protocols, firewalls, and intrusion detection systems.',
          duration: '18:20',
          views: '1.5M',
          thumbnail: 'https://img.youtube.com/vi/qiQR5rTSshw/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
          level: 'Intermediate'
        }
      ]
    },
    {
      title: 'Ethical Hacking & Penetration Testing',
      videos: [
        {
          title: 'Ethical Hacking Course - Complete Video Tutorial',
          description: 'Complete ethical hacking course covering reconnaissance, scanning, enumeration, and exploitation.',
          duration: '12:45:30',
          views: '4.2M',
          thumbnail: 'https://img.youtube.com/vi/3Kq1MIfTWCE/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE',
          level: 'Advanced'
        }
      ]
    },
    {
      title: 'NPTEL Courses',
      videos: []
    }
  ];

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/training')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Training
          </Button>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-lg text-white mb-8">
              <Play className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Video Library</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Access our curated collection of cybersecurity videos from industry experts and educational channels
              </p>
            </div>
          </div>

          {/* Video Categories */}
          {videoCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video, videoIndex) => (
                  <Card key={videoIndex} className="hover:shadow-lg transition-shadow cursor-pointer group" 
                        onClick={() => handleVideoClick(video.url)}>
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x225/1f2937/ffffff?text=Video+Thumbnail';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Level:</span>
                          <Badge className={getLevelColor(video.level)}>
                            {video.level}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            Views:
                          </span>
                          <span className="text-sm">{video.views}</span>
                        </div>
                        <Button className="w-full" onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(video.url);
                        }}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {category.title === 'NPTEL Courses' ? 'Watch on NPTEL' : 'Watch on YouTube'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Learning Tips */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Learning Tips</CardTitle>
              <CardDescription>
                Essential tips to maximize your cybersecurity learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Practice hands-on with virtual labs</strong> - Set up virtual machines and practice with tools like Kali Linux, Metasploit, and Wireshark</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Join cybersecurity communities and forums</strong> - Engage with Reddit communities, Discord servers, and professional forums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Participate in CTF competitions</strong> - Test your skills with platforms like HackTheBox, TryHackMe, and PicoCTF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Stay updated with latest security news</strong> - Follow security blogs, podcasts, and industry publications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Build a home lab for experimentation</strong> - Create a safe environment to test and learn new techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Follow structured learning paths</strong> - Complete NPTEL courses systematically and take notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span><strong>Network with professionals</strong> - Attend cybersecurity conferences, webinars, and meetups</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VideoLibrary;
