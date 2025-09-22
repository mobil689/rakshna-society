import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// AFTER:
import { ArrowLeft, Shield, Globe, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const CyberSecurityResources = () => {
  const navigate = useNavigate();

  const resourceCategories = [
    {
      title: 'Indian Cyber Crime Coordination Centre (I4C)',
      description: 'Official resources from I4C - India\'s nodal agency for cybercrime coordination',
      icon: Shield,
      color: 'text-blue-600',
      resources: []
    },
    {
      title: 'Computer Emergency Response Team - India (CERT-IN)',
      description: 'India\'s national agency for cybersecurity incident response and coordination',
      icon: Globe,
      color: 'text-green-600',
      resources: []
    }
  ];



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
              <BookOpen className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Cyber Security Resources</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Access official cybersecurity guidelines, frameworks, and resources from leading agencies and organizations
              </p>
            </div>
          </div>

          {/* Resource Categories */}
          {resourceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gray-100`}>
                    <IconComponent className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-primary">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CyberSecurityResources;
