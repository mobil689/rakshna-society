import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Search, Shield, Lock, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Guidelines = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const bestPractices = [
    {
      category: 'Password Security',
      icon: Lock,
      practices: [
        'Use strong, unique passwords for each account (minimum 12 characters)',
        'Enable two-factor authentication (2FA) wherever possible',
        'Use a reputable password manager to generate and store passwords',
        'Never share passwords or write them down in unsecured locations',
        'Change passwords immediately if you suspect they\'ve been compromised',
        'Avoid using personal information in passwords (names, birthdays, etc.)'
      ]
    },
    {
      category: 'Email Security',
      icon: Shield,
      practices: [
        'Verify sender identity before clicking links or downloading attachments',
        'Look for spelling errors, urgent language, or unusual requests',
        'Hover over links to preview destinations before clicking',
        'Report suspicious emails to your IT security team',
        'Use encrypted email for sensitive communications',
        'Be cautious of emails requesting personal or financial information'
      ]
    },
    {
      category: 'Device Security',
      icon: AlertTriangle,
      practices: [
        'Keep operating systems and software updated with latest patches',
        'Use reputable antivirus software with real-time protection',
        'Enable automatic screen locks with strong PINs or biometrics',
        'Avoid using public Wi-Fi for sensitive activities',
        'Encrypt sensitive data on laptops and mobile devices',
        'Regularly backup important data to secure, offline locations'
      ]
    },
    {
      category: 'Incident Response',
      icon: CheckCircle,
      practices: [
        'Immediately disconnect infected devices from networks',
        'Document all observed symptoms and suspicious activities',
        'Contact IT security team or emergency helpline immediately',
        'Preserve evidence - don\'t delete files or clear browser history',
        'Change passwords for potentially compromised accounts',
        'Monitor financial accounts for unauthorized transactions'
      ]
    }
  ];

  const downloadableResources = [
    {
      title: 'Cybersecurity Best Practices Guide',
      description: 'Comprehensive guide covering essential security practices for individuals and organizations',
      format: 'PDF',
      size: '2.1 MB',
      updated: '2024-01-15',
      category: 'General'
    },
    {
      title: 'Incident Response Playbook',
      description: 'Step-by-step procedures for responding to various types of cyber incidents',
      format: 'PDF',
      size: '3.8 MB', 
      updated: '2024-01-10',
      category: 'Response'
    },
    {
      title: 'Phishing Identification Checklist',
      description: 'Quick reference guide for identifying and handling suspicious emails',
      format: 'PDF',
      size: '850 KB',
      updated: '2024-01-12',
      category: 'Email Security'
    },
    {
      title: 'Password Security Template',
      description: 'Password policy template for organizations and personal use',
      format: 'DOCX',
      size: '1.2 MB',
      updated: '2024-01-08',
      category: 'Access Control'
    },
    {
      title: 'Network Security Audit Checklist',
      description: 'Comprehensive checklist for evaluating network security posture',
      format: 'PDF',
      size: '2.7 MB',
      updated: '2024-01-05',
      category: 'Network Security'
    }
  ];

  const externalResources = [
    {
      title: 'NIST Cybersecurity Framework',
      organization: 'NIST',
      description: 'Comprehensive framework for improving cybersecurity posture',
      url: 'https://www.nist.gov/cyberframework'
    },
    {
      title: 'CISA Security Advisories',
      organization: 'CISA',
      description: 'Latest cybersecurity alerts and advisories',
      url: 'https://www.cisa.gov/news-events/cybersecurity-advisories'
    },
    {
      title: 'SANS Security Awareness',
      organization: 'SANS Institute',
      description: 'Security awareness training resources and materials',
      url: 'https://www.sans.org/security-awareness-training/'
    },
    {
      title: 'OWASP Security Guidelines',
      organization: 'OWASP',
      description: 'Web application security best practices and guidelines',
      url: 'https://owasp.org/www-project-top-ten/'
    }
  ];

  const filteredResources = downloadableResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-lg text-white mb-8">
              <FileText className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Security Guidelines & Resources</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Comprehensive cybersecurity best practices, downloadable resources, and expert guidance to protect your digital assets
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search guidelines, resources, and best practices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="practices" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="practices">Best Practices</TabsTrigger>
              <TabsTrigger value="downloads">Downloadable Resources</TabsTrigger>
              <TabsTrigger value="external">External Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="practices">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bestPractices.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {category.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {category.practices.map((practice, practiceIndex) => (
                            <li key={practiceIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                              <span>{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="downloads">
              <div className="space-y-4">
                {filteredResources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                            <Badge variant="secondary">{resource.category}</Badge>
                            <Badge variant="outline">{resource.format}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Size: {resource.size}</span>
                            <span>Updated: {resource.updated}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-6">
                          <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredResources.length === 0 && searchTerm && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No results found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or browse all resources.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="external">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {externalResources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{resource.title}</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mb-2">{resource.organization}</Badge>
                        <p>{resource.description}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Resource
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Submit a Resource</CardTitle>
                  <CardDescription>
                    Know of a valuable cybersecurity resource? Help us expand our collection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Suggest New Resource
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guidelines;