import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, Mail, Clock, AlertTriangle, HelpCircle, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Helpline = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const emergencyContacts = [
    {
      type: 'Critical Incidents',
      phone: '+1-800-CYBER-911',
      email: 'emergency@cybersecure.gov',
      availability: '24/7',
      responseTime: 'Immediate',
      description: 'For active cyberattacks and critical security incidents'
    },
    {
      type: 'General Support',
      phone: '+1-800-CYBER-HELP',
      email: 'support@cybersecure.gov', 
      availability: 'Mon-Fri 8AM-8PM EST',
      responseTime: '< 4 hours',
      description: 'For general security questions and guidance'
    },
    {
      type: 'Technical Assistance',
      phone: '+1-800-CYBER-TECH',
      email: 'technical@cybersecure.gov',
      availability: 'Mon-Fri 9AM-6PM EST', 
      responseTime: '< 24 hours',
      description: 'For technical implementation and configuration help'
    }
  ];

  const faqItems = [
    {
      question: 'What should I do if I think I\'ve been hacked?',
      answer: 'Immediately disconnect affected devices from the internet, do not turn them off, document everything you observe, and call our emergency hotline at +1-800-CYBER-911. Preserve evidence and avoid making changes to the system.'
    },
    {
      question: 'How do I report a phishing email?',
      answer: 'Forward the suspicious email to phishing@cybersecure.gov, include full headers if possible, and report it through our incident portal. Do not click any links or download attachments from the suspicious email.'
    },
    {
      question: 'What information should I prepare before calling?',
      answer: 'Have ready: your contact information, description of the incident, affected systems, timeline of events, any error messages or screenshots, and steps already taken to address the issue.'
    },
    {
      question: 'Is there a cost for cybersecurity support?',
      answer: 'Basic cybersecurity guidance and incident response support are provided free of charge as a public service. Specialized consulting services may have associated fees which will be discussed upfront.'
    },
    {
      question: 'How long does incident response take?',
      answer: 'Response times vary by severity: Critical incidents receive immediate response, high priority incidents within 1 hour, and standard issues within 4-24 hours. Complex investigations may take several days to weeks.'
    },
    {
      question: 'Can you help with regulatory compliance?',
      answer: 'Yes, we provide guidance on cybersecurity compliance requirements for various regulations including HIPAA, SOX, PCI-DSS, and others. Contact our general support line for compliance assistance.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-primary to-primary-light p-8 rounded-lg text-white mb-8">
              <Phone className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Emergency Cybersecurity Helpline</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Get immediate assistance from cybersecurity experts. Available 24/7 for critical incidents and emergencies.
              </p>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className={`${index === 0 ? 'border-destructive bg-destructive/5' : 'border-border'}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${index === 0 ? 'text-destructive' : 'text-primary'}`}>
                    {index === 0 ? <AlertTriangle className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                    {contact.type}
                  </CardTitle>
                  <CardDescription>{contact.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Phone:</span>
                      <a href={`tel:${contact.phone}`} className="font-mono text-sm hover:underline">
                        {contact.phone}
                      </a>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Email:</span>
                      <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hours:</span>
                      <span className="text-sm">{contact.availability}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Response:</span>
                      <span className="text-sm font-medium text-success">{contact.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      variant={index === 0 ? 'destructive' : 'default'}
                      asChild
                    >
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${contact.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Support Ticket */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Submit Support Ticket
                </CardTitle>
                <CardDescription>
                  For non-emergency issues, submit a detailed support ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!ticketSubmitted ? (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ticket-name">Full Name *</Label>
                        <Input id="ticket-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ticket-email">Email Address *</Label>
                        <Input id="ticket-email" type="email" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ticket-subject">Subject *</Label>
                      <Input id="ticket-subject" placeholder="Brief description of your issue" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ticket-priority">Priority Level</Label>
                      <select className="w-full p-2 border border-input rounded-md bg-background">
                        <option value="low">Low - General question</option>
                        <option value="medium">Medium - Issue affecting work</option>
                        <option value="high">High - Significant impact</option>
                        <option value="urgent">Urgent - Critical business impact</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ticket-description">Detailed Description *</Label>
                      <Textarea 
                        id="ticket-description" 
                        placeholder="Describe your issue in detail, including steps to reproduce, error messages, and expected vs actual behavior..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Phone className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ticket Submitted Successfully!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your support ticket has been received. Ticket ID: #TKT-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      You will receive an email confirmation shortly with tracking information.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setTicketSubmitted(false)}
                      className="w-full"
                    >
                      Submit Another Ticket
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common cybersecurity questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Can't find what you're looking for?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our support team is here to help with any cybersecurity questions or concerns.
                  </p>
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support Specialist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Helpline;