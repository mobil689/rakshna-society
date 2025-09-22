import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Download, FileText, Shield, Globe, BookOpen, Users, Calendar } from 'lucide-react';
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
      resources: [
        {
          title: 'Cyber Crime Prevention Guidelines',
          description: 'Comprehensive guidelines for preventing cyber crimes in India',
          type: 'PDF',
          size: '2.3 MB',
          url: 'https://cybercrime.gov.in/UploadedDocuments/Cyber_Crime_Prevention_Guidelines.pdf',
          category: 'Guidelines'
        },
        {
          title: 'I4C Annual Report 2023',
          description: 'Annual report on cybercrime trends and I4C activities',
          type: 'PDF',
          size: '5.1 MB',
          url: 'https://cybercrime.gov.in/UploadedDocuments/I4C_Annual_Report_2023.pdf',
          category: 'Report'
        },
        {
          title: 'Cyber Hygiene Best Practices',
          description: 'Essential cyber hygiene practices for individuals and organizations',
          type: 'PDF',
          size: '1.8 MB',
          url: 'https://cybercrime.gov.in/UploadedDocuments/Cyber_Hygiene_Best_Practices.pdf',
          category: 'Guide'
        },
        {
          title: 'Incident Reporting Portal',
          description: 'Official portal for reporting cyber crimes and incidents',
          type: 'Web Portal',
          size: 'Online',
          url: 'https://cybercrime.gov.in/',
          category: 'Portal'
        }
      ]
    },
    {
      title: 'Computer Emergency Response Team - India (CERT-IN)',
      description: 'India\'s national agency for cybersecurity incident response and coordination',
      icon: Globe,
      color: 'text-green-600',
      resources: [
        {
          title: 'CERT-IN Security Guidelines',
          description: 'Official security guidelines for IT infrastructure and systems',
          type: 'PDF',
          size: '3.2 MB',
          url: 'https://www.cert-in.org.in/Downloader?pageid=5&type=2&fileName=SecurityGuidelines.pdf',
          category: 'Guidelines'
        },
        {
          title: 'Cyber Security Incident Reporting',
          description: 'Guidelines for reporting cybersecurity incidents to CERT-IN',
          type: 'PDF',
          size: '1.5 MB',
          url: 'https://www.cert-in.org.in/Downloader?pageid=5&type=2&fileName=IncidentReporting.pdf',
          category: 'Procedure'
        },
        {
          title: 'CERT-IN Vulnerability Notes',
          description: 'Latest vulnerability assessments and security advisories',
          type: 'PDF',
          size: '2.1 MB',
          url: 'https://www.cert-in.org.in/Downloader?pageid=5&type=2&fileName=VulnerabilityNotes.pdf',
          category: 'Advisory'
        },
        {
          title: 'CERT-IN Portal',
          description: 'Official CERT-IN portal for incident reporting and resources',
          type: 'Web Portal',
          size: 'Online',
          url: 'https://www.cert-in.org.in/',
          category: 'Portal'
        }
      ]
    },
    {
      title: 'Cybersecurity and Infrastructure Security Agency (CISA)',
      description: 'US federal agency providing cybersecurity resources and best practices',
      icon: BookOpen,
      color: 'text-purple-600',
      resources: [
        {
          title: 'CISA Cybersecurity Framework',
          description: 'Comprehensive framework for improving cybersecurity posture',
          type: 'PDF',
          size: '4.7 MB',
          url: 'https://www.cisa.gov/sites/default/files/publications/cybersecurity-framework-version-1.1.pdf',
          category: 'Framework'
        },
        {
          title: 'Essential Cybersecurity Controls',
          description: 'Critical security controls for protecting information systems',
          type: 'PDF',
          size: '3.8 MB',
          url: 'https://www.cisa.gov/sites/default/files/publications/essential-cybersecurity-controls.pdf',
          category: 'Controls'
        },
        {
          title: 'Incident Response Plan Template',
          description: 'Template for developing organizational incident response plans',
          type: 'PDF',
          size: '2.9 MB',
          url: 'https://www.cisa.gov/sites/default/files/publications/incident-response-plan-template.pdf',
          category: 'Template'
        },
        {
          title: 'CISA Resources Portal',
          description: 'Access to CISA\'s comprehensive cybersecurity resource library',
          type: 'Web Portal',
          size: 'Online',
          url: 'https://www.cisa.gov/resources-tools',
          category: 'Portal'
        }
      ]
    }
  ];

  const additionalResources = [
    {
      title: 'NIST Cybersecurity Framework',
      description: 'US National Institute of Standards and Technology cybersecurity framework',
      url: 'https://www.nist.gov/cyberframework',
      type: 'Framework'
    },
    {
      title: 'ISO/IEC 27001:2022',
      description: 'International standard for information security management systems',
      url: 'https://www.iso.org/standard/27001',
      type: 'Standard'
    },
    {
      title: 'OWASP Top 10',
      description: 'Top 10 most critical web application security risks',
      url: 'https://owasp.org/www-project-top-ten/',
      type: 'Guide'
    },
    {
      title: 'SANS Security Training',
      description: 'Professional cybersecurity training and certification programs',
      url: 'https://www.sans.org/',
      type: 'Training'
    }
  ];

  const handleResourceClick = (url: string) => {
    window.open(url, '_blank');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Guidelines':
        return 'bg-blue-100 text-blue-800';
      case 'Report':
        return 'bg-green-100 text-green-800';
      case 'Guide':
        return 'bg-yellow-100 text-yellow-800';
      case 'Portal':
        return 'bg-purple-100 text-purple-800';
      case 'Procedure':
        return 'bg-orange-100 text-orange-800';
      case 'Advisory':
        return 'bg-red-100 text-red-800';
      case 'Framework':
        return 'bg-indigo-100 text-indigo-800';
      case 'Controls':
        return 'bg-pink-100 text-pink-800';
      case 'Template':
        return 'bg-teal-100 text-teal-800';
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <Card key={resourceIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2">
                              {resource.description}
                            </CardDescription>
                          </div>
                          <Badge className={getCategoryColor(resource.category)}>
                            {resource.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Type:</span>
                            <span>{resource.type}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">Size:</span>
                            <span>{resource.size}</span>
                          </div>
                          <Button 
                            className="w-full" 
                            onClick={() => handleResourceClick(resource.url)}
                          >
                            {resource.type === 'PDF' ? (
                              <>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </>
                            ) : (
                              <>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Visit Portal
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Additional Resources */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Additional International Resources</CardTitle>
              <CardDescription>
                Explore cybersecurity frameworks and standards from leading international organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalResources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleResourceClick(resource.url)}
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Visit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Links */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Access Links</CardTitle>
              <CardDescription>
                Direct links to official portals and reporting systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleResourceClick('https://cybercrime.gov.in/')}
                >
                  <Shield className="h-6 w-6" />
                  <span className="font-medium">I4C Portal</span>
                  <span className="text-xs text-muted-foreground">Report Cyber Crimes</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleResourceClick('https://www.cert-in.org.in/')}
                >
                  <Globe className="h-6 w-6" />
                  <span className="font-medium">CERT-IN</span>
                  <span className="text-xs text-muted-foreground">Incident Response</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center gap-2"
                  onClick={() => handleResourceClick('https://www.cisa.gov/')}
                >
                  <BookOpen className="h-6 w-6" />
                  <span className="font-medium">CISA Resources</span>
                  <span className="text-xs text-muted-foreground">Security Guidelines</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CyberSecurityResources;
