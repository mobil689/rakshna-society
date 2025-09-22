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
          title: 'Types of Cyber Attacks',
          description: 'Comprehensive overview of different types of cyber attacks and how to defend against them.',
          duration: '22:45',
          views: '1.8M',
          thumbnail: 'https://img.youtube.com/vi/Dk-ZqQ-bEY4/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=Dk-ZqQ-bEY4',
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
        },
        {
          title: 'Penetration Testing with Kali Linux',
          description: 'Learn penetration testing techniques using Kali Linux tools and methodologies.',
          duration: '8:30:15',
          views: '2.1M',
          thumbnail: 'https://img.youtube.com/vi/lZAoFs75_cs/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=lZAoFs75_cs',
          level: 'Advanced'
        },
        {
          title: 'Metasploit Framework Tutorial',
          description: 'Complete guide to using Metasploit for penetration testing and vulnerability assessment.',
          duration: '3:45:20',
          views: '1.9M',
          thumbnail: 'https://img.youtube.com/vi/8t6t6PQ5qXE/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=8t6t6PQ5qXE',
          level: 'Intermediate'
        }
      ]
    },
    {
      title: 'Incident Response & Digital Forensics',
      videos: [
        {
          title: 'Incident Response Planning',
          description: 'Learn how to develop and implement effective incident response plans for your organization.',
          duration: '25:10',
          views: '856K',
          thumbnail: 'https://img.youtube.com/vi/qjE5dX9b5lY/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=qjE5dX9b5lY',
          level: 'Intermediate'
        },
        {
          title: 'Digital Forensics Fundamentals',
          description: 'Introduction to digital forensics, evidence collection, and analysis techniques.',
          duration: '32:45',
          views: '1.2M',
          thumbnail: 'https://img.youtube.com/vi/ZltvaKj1zVs/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=ZltvaKj1zVs',
          level: 'Intermediate'
        },
        {
          title: 'Malware Analysis Basics',
          description: 'Learn how to analyze malware, understand its behavior, and develop countermeasures.',
          duration: '28:30',
          views: '743K',
          thumbnail: 'https://img.youtube.com/vi/29h0VgWgB6U/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=29h0VgWgB6U',
          level: 'Advanced'
        }
      ]
    },
    {
      title: 'Cyber Law & Compliance',
      videos: [
        {
          title: 'Cyber Law in India - IT Act 2000',
          description: 'Comprehensive overview of cyber laws in India, including IT Act 2000 and recent amendments.',
          duration: '35:20',
          views: '567K',
          thumbnail: 'https://img.youtube.com/vi/RFh_7XJd0Pg/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=RFh_7XJd0Pg',
          level: 'Beginner'
        },
        {
          title: 'GDPR Compliance for Cybersecurity',
          description: 'Understanding GDPR requirements and how they impact cybersecurity practices.',
          duration: '28:15',
          views: '432K',
          thumbnail: 'https://img.youtube.com/vi/4c2lJAlBmMI/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=4c2lJAlBmMI',
          level: 'Intermediate'
        }
      ]
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
                          Watch on YouTube
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Resources */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Additional Learning Resources</CardTitle>
              <CardDescription>
                Explore more cybersecurity content from trusted sources and educational platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Recommended Channels:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Professor Messer</strong> - CompTIA Security+ training</li>
                    <li>• <strong>NetworkChuck</strong> - Practical cybersecurity tutorials</li>
                    <li>• <strong>John Hammond</strong> - Malware analysis and CTF walkthroughs</li>
                    <li>• <strong>IppSec</strong> - Advanced penetration testing techniques</li>
                    <li>• <strong>Cybrary</strong> - Professional cybersecurity courses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Learning Tips:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Practice hands-on with virtual labs</li>
                    <li>• Join cybersecurity communities and forums</li>
                    <li>• Participate in CTF competitions</li>
                    <li>• Stay updated with latest security news</li>
                    <li>• Build a home lab for experimentation</li>
                  </ul>
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

export default VideoLibrary;
