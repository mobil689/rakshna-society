import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Search, Shield, Lock, AlertTriangle, CheckCircle, ExternalLink, Eye, Send, Loader2, Globe, CreditCard, Smartphone, HardDrive, Usb, Package, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WEB3FORMS_ACCESS_KEY = '0ec500b0-f819-4bb2-8ea7-dc217a17807d';

const Guidelines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);
  const [suggestForm, setSuggestForm] = useState({ name: '', email: '', resource: '', details: '' });
  const [suggestStatus, setSuggestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [detailDialog, setDetailDialog] = useState<{ open: boolean; title: string; practices: string[]; icon: typeof Shield } | null>(null);

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Resource Suggestion from ${suggestForm.name}`,
          from_name: suggestForm.name,
          email: suggestForm.email,
          resource: suggestForm.resource,
          details: suggestForm.details,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSuggestStatus('success');
        setSuggestForm({ name: '', email: '', resource: '', details: '' });
      } else {
        console.error("Web3Forms API Error:", result);
        setSuggestStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms submission failed:", error);
      setSuggestStatus('error');
    }
  };

  const resetSuggestDialog = () => {
    setSuggestDialogOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setSuggestStatus('idle');
      setSuggestForm({ name: '', email: '', resource: '', details: '' });
    }, 200);
  };

  const bestPractices = [
    {
      category: 'Secure Web Browsing',
      icon: Globe,
      practices: [
        'Use browsers that support phishing and malware protection features.',
        'Enable automatic blocking of pop-ups and malicious redirects.',
        'Verify website certificates before entering sensitive information.',
        'Avoid installing unnecessary browser extensions.',
        'Close browser sessions after using shared systems.',
      ]
    },
    {
      category: 'Digital Privacy Awareness',
      icon: Eye,
      practices: [
        'Limit how much personal information is visible in online profiles.',
        'Regularly check which websites or apps have access to your accounts.',
        'Opt out of unnecessary data tracking or targeted advertising settings.',
        'Be cautious when participating in online surveys requesting personal details.',
      ]
    },
    {
      category: 'Online Payment & Financial Safety',
      icon: CreditCard,
      practices: [
        'Use trusted payment gateways when making purchases.',
        'Enable bank transaction alerts.',
        'Avoid saving card details on unfamiliar websites.',
        'Double-check URLs before entering payment information.',
        'Use virtual cards or secure payment apps where possible.',
      ]
    },
    {
      category: 'Account & Password Security',
      icon: Lock,
      practices: [
        'Use strong passwords (12–16 characters with mix of letters, numbers, symbols).',
        'Use a password manager to generate and store passwords.',
        'Enable multi-factor authentication (MFA) for important accounts.',
        'Avoid reusing passwords across multiple platforms.',
        'Review account recovery options (backup email, phone numbers).',
        'Enable login alerts for new device access.',
        'Log out of accounts on shared or public computers.',
      ]
    },
    {
      category: 'Email & Phishing Protection',
      icon: Shield,
      practices: [
        'Verify sender identity before opening attachments or links.',
        'Be cautious of urgent messages asking for money or credentials.',
        'Hover over links to inspect the actual destination.',
        'Watch for unusual grammar, spelling, or formatting.',
        'Never send sensitive information via email unless encrypted.',
        'Report suspicious emails to the appropriate IT/security team.',
      ]
    },
    {
      category: 'Incident Response',
      icon: CheckCircle,
      practices: [
        'Disconnect infected devices from networks.',
        'Change compromised passwords immediately.',
        'Report incidents to IT/security teams.',
        'Monitor accounts for suspicious activity.',
        'Document all observed symptoms and suspicious activities.',
        'Contact IT security team or emergency helpline immediately.',
        'Preserve evidence — don\'t delete files or clear browser history.',
        'Monitor financial accounts for unauthorized transactions.',
      ]
    },
    {
      category: 'Device & System Security',
      icon: HardDrive,
      practices: [
        'Keep operating systems and applications updated with security patches.',
        'Enable automatic screen lock with PIN, password, or biometrics.',
        'Use antivirus or endpoint protection software.',
        'Encrypt laptops and mobile devices.',
        'Disable installation from unknown sources.',
      ]
    },
    {
      category: 'External Devices & USB Safety',
      icon: Usb,
      practices: [
        'Avoid plugging in unknown USB drives.',
        'Scan external storage devices before opening files.',
        'Disable auto run features.',
      ]
    },
    {
      category: 'Software & Application Safety',
      icon: Package,
      practices: [
        'Download software only from official sources.',
        'Avoid pirated or cracked software.',
        'Remove unused applications.',
        'Check app permissions before installing.',
      ]
    },
    {
      category: 'Mobile Device Security',
      icon: Smartphone,
      practices: [
        'Install apps only from official app stores.',
        'Review permissions like camera, microphone, location.',
        'Enable remote device tracking and remote wipe.',
        'Lock devices with strong authentication.',
      ]
    },
    {
      category: 'Password Security',
      icon: Lock,
      practices: [
        'Use strong, unique passwords for each account (minimum 12 characters).',
        'Enable two-factor authentication (2FA) wherever possible.',
        'Use a reputable password manager to generate and store passwords.',
        'Never share passwords or write them down in unsecured locations.',
        'Change passwords immediately if you suspect they\'ve been compromised.',
        'Avoid using personal information in passwords (names, birthdays, etc.).',
      ]
    },
    {
      category: 'Email Security',
      icon: Shield,
      practices: [
        'Verify sender identity before clicking links or downloading attachments.',
        'Look for spelling errors, urgent language, or unusual requests.',
        'Hover over links to preview destinations before clicking.',
        'Report suspicious emails to your IT security team.',
        'Use encrypted email for sensitive communications.',
        'Be cautious of emails requesting personal or financial information.',
      ]
    },
    {
      category: 'Device Security',
      icon: AlertTriangle,
      practices: [
        'Keep operating systems and software updated with latest patches.',
        'Use reputable antivirus software with real-time protection.',
        'Enable automatic screen locks with strong PINs or biometrics.',
        'Avoid using public Wi-Fi for sensitive activities.',
        'Encrypt sensitive data on laptops and mobile devices.',
        'Regularly backup important data to secure, offline locations.',
      ]
    },
    {
      category: 'Avoiding Student Scams',
      icon: AlertTriangle,
      practices: [
        'Be skeptical of emails about scholarships, job offers, or grade changes you didn\'t apply for.',
        'Never pay a fee for a job application or scholarship. Legitimate organizations don\'t ask for this.',
        'Verify urgent requests from "professors" or "deans" by contacting them through an official channel.',
        'Watch out for phishing emails that look like they\'re from the college library, accounts office, or IT desk.',
      ]
    },
    {
      category: 'Smart Social Media Habits',
      icon: Users,
      practices: [
        'Review your privacy settings regularly on Instagram, Facebook, etc., to control who sees your information.',
        'Avoid oversharing personal details like your class schedule, home address, or phone number.',
        'Be careful what\'s in the background of your photos before you post.',
        'Think twice before accepting friend requests from people you don\'t know.',
      ]
    }
  ];

    const downloadableResources = [
        {
            title: 'Cybersecurity Best Practices Guide',
            description: 'Comprehensive guide covering essential security practices for individuals and organizations',
            format: 'PDF',
            size: '2.1 MB',
            updated: '2025-09-12',
            category: 'General',
            previewUrl: 'https://www.cert-in.org.in/PDF/CSH_Booklet.pdf'
        },
        {
            title: 'Incident Response Playbook',
            description: 'Step-by-step procedures for responding to various types of cyber incidents',
            format: 'PDF',
            size: '3.8 MB',
            updated: '2025-09-12',
            category: 'Response',
            previewUrl: 'https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf'
        },
        // ... adding previewUrl for other resources too
        {
            title: 'Phishing Identification Checklist',
            description: 'Quick reference guide for identifying and handling suspicious emails',
            format: 'PDF',
            size: '850 KB',
            updated: '2025-09-12',
            category: 'Email Security',
            previewUrl: 'https://bangkok.ohchr.org/sites/default/files/documents/2024-06/11.-Phishing-attacks.pdf'
        },
        {
            title: 'Password Security Template',
            description: 'Password policy template for organizations and personal use',
            format: 'DOCX',
            size: '1.2 MB',
            updated: '2025-09-10',
            category: 'Access Control',
            previewUrl: 'https://www.cisa.gov/sites/default/files/2024-09/Secure-Our-World-Passwords-Tip-Sheet.pdf'
        },
        {
            title: 'Network Security Audit Checklist',
            description: 'Comprehensive checklist for evaluating network security posture',
            format: 'PDF',
            size: '2.7 MB',
            updated: '2025-09-09',
            category: 'Network Security',
            previewUrl: 'https://www.infosim.net/stablenet/wp-content/uploads/5/2023/07/Checkliste-Network-Audit.pdf'
        }
    ];

    const externalResources = [
        {
            title: 'CERT-In Security Guidelines',
            organization: 'CERT-In (Govt. of India)',
            description: 'Official advisories and guidelines from India\'s national cybersecurity agency.',
            url: 'https://www.cert-in.org.in/'
        },
        {
            title: 'National Cyber Crime Portal',
            organization: 'Ministry of Home Affairs',
            description: 'Report all types of cybercrime online and access resources for victims of cyber fraud.',
            url: 'https://www.cybercrime.gov.in/'
        },
        {
            title: 'Cyber Dost Awareness',
            organization: 'Govt. of India Initiative',
            description: 'Safety tips and awareness alerts on cybersecurity topics via their official X (Twitter) handle.',
            url: 'https://x.com/Cyberdost'
        },
        {
            title: 'I4C - Indian Cyber Crime Centre',
            organization: 'Ministry of Home Affairs',
            description: 'The central government body for dealing with cybersecurity issues in India.',
            url: 'https://i4c.mha.gov.in/'
        }
    ];

  const filteredResources = downloadableResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Unified search results across all tabs
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase();
    const results: Array<{ type: 'practice' | 'download' | 'external'; title: string; summary: string; icon: typeof Shield; link?: string }> = [];

    // Search best practices
    bestPractices.forEach((category) => {
      const matchingPractices = category.practices.filter(p => p.toLowerCase().includes(term));
      const categoryMatch = category.category.toLowerCase().includes(term);
      if (categoryMatch || matchingPractices.length > 0) {
        const displayPractices = categoryMatch ? category.practices : matchingPractices;
        const summary = displayPractices.length > 2
          ? `${displayPractices.slice(0, 2).join(' • ')} — and ${displayPractices.length - 2} more tip${displayPractices.length - 2 > 1 ? 's' : ''}`
          : displayPractices.join(' • ');
        results.push({ type: 'practice', title: category.category, summary, icon: category.icon });
      }
    });

    // Search downloadable resources
    downloadableResources.forEach((resource) => {
      if (
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.category.toLowerCase().includes(term)
      ) {
        results.push({ type: 'download', title: resource.title, summary: resource.description, icon: FileText, link: resource.previewUrl });
      }
    });

    // Search external resources
    externalResources.forEach((resource) => {
      if (
        resource.title.toLowerCase().includes(term) ||
        resource.organization.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term)
      ) {
        results.push({ type: 'external', title: resource.title, summary: `${resource.organization} — ${resource.description}`, icon: ExternalLink, link: resource.url });
      }
    });

    return results;
  }, [searchTerm]);

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

          {/* Search Results View */}
          {searchResults && searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchTerm}"
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
              {searchResults.map((result, index) => {
                const IconComponent = result.icon;
                const isPractice = result.type === 'practice';
                const practiceCategory = isPractice
                  ? bestPractices.find(bp => bp.category === result.title)
                  : null;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      if (isPractice && practiceCategory) {
                        setDetailDialog({ open: true, title: practiceCategory.category, practices: practiceCategory.practices, icon: practiceCategory.icon });
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 shrink-0">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{result.title}</h3>
                            <Badge variant={result.type === 'practice' ? 'default' : result.type === 'download' ? 'secondary' : 'outline'}>
                              {result.type === 'practice' ? 'Best Practice' : result.type === 'download' ? 'Resource' : 'External'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">{result.summary}</p>
                          {isPractice && (
                            <p className="text-xs text-primary mt-1">Click to view full details</p>
                          )}
                        </div>
                        {result.link && (
                          <Button size="sm" asChild className="shrink-0" onClick={e => e.stopPropagation()}>
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                              {result.type === 'download' ? (
                                <><Eye className="mr-2 h-4 w-4" /> Preview</>
                              ) : (
                                <><ExternalLink className="mr-2 h-4 w-4" /> Visit</>
                              )}
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : searchResults && searchResults.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse all resources.
                </p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
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
                {downloadableResources.map((resource, index) => (
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
                          <Button size="sm" asChild>
                            <a href={resource.previewUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                  <Button variant="outline" className="w-full" onClick={() => setSuggestDialogOpen(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Suggest New Resource
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </main>

      {/* Best Practice Detail Dialog */}
      {detailDialog && (
        <Dialog open={detailDialog.open} onOpenChange={(open) => setDetailDialog(open ? detailDialog : null)}>
          <DialogContent className="sm:max-w-[520px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {(() => { const Icon = detailDialog.icon; return <Icon className="h-5 w-5 text-primary" />; })()}
                {detailDialog.title}
              </DialogTitle>
              <DialogDescription>
                Best practices and guidelines for {detailDialog.title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-3 mt-2">
              {detailDialog.practices.map((practice, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}

      {/* Suggest Resource Dialog */}
      <Dialog open={suggestDialogOpen} onOpenChange={(open) => { if (!open) resetSuggestDialog(); else setSuggestDialogOpen(true); }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Suggest a Resource
            </DialogTitle>
            <DialogDescription>
              Share a cybersecurity resource you find valuable. We'll review and add it to our collection.
            </DialogDescription>
          </DialogHeader>

          {suggestStatus === 'success' ? (
            <div className="text-center py-6">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Your resource suggestion has been submitted successfully. Our team will review it soon.
              </p>
              <Button variant="outline" className="w-full" onClick={resetSuggestDialog}>
                Close
              </Button>
            </div>
          ) : suggestStatus === 'error' ? (
            <div className="text-center py-6">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted-foreground text-sm mb-4">
                We couldn't send your suggestion. Please try again or email us directly at rakshnamait@gmail.com.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={resetSuggestDialog}>
                  Close
                </Button>
                <Button className="flex-1" onClick={() => setSuggestStatus('idle')}>
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSuggestSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="suggest-name">Name *</Label>
                <Input
                  id="suggest-name"
                  placeholder="Your full name"
                  value={suggestForm.name}
                  onChange={(e) => setSuggestForm({ ...suggestForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-email">Email *</Label>
                <Input
                  id="suggest-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={suggestForm.email}
                  onChange={(e) => setSuggestForm({ ...suggestForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-resource">Resource *</Label>
                <Input
                  id="suggest-resource"
                  placeholder="URL or name of the resource"
                  value={suggestForm.resource}
                  onChange={(e) => setSuggestForm({ ...suggestForm, resource: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">Can be a website URL, document name, or tool name</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="suggest-details">Details</Label>
                <Textarea
                  id="suggest-details"
                  placeholder="Why do you recommend this resource? What makes it useful?"
                  rows={3}
                  value={suggestForm.details}
                  onChange={(e) => setSuggestForm({ ...suggestForm, details: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={suggestStatus === 'sending'}>
                {suggestStatus === 'sending' ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Submit Suggestion</>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Guidelines;