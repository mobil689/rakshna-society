import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, Mail, Clock, AlertTriangle, HelpCircle, Send, Loader2, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Helpline = () => {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', subject: '', priority: 'low', description: '' });

  const emergencyContacts = [
    {
      type: 'Critical Incidents',
      phone: '1930',
      email: 'cybercrime.gov.in',
      availability: '24/7',
      responseTime: 'Immediate',
      description: 'For active cyberattacks and critical security incidents'
    },
    {
      type: 'General Support',
      email: 'rakshana.mait@gmail.com',
      availability: 'Mon-Fri 8AM-8PM EST',
      responseTime: '< 4 hours',
      description: 'For general security questions and guidance'
    },
    {
      type: 'Technical Assistance',
      email: 'rakshana.mait@gmail.com',
      availability: 'Mon-Fri 9AM-6PM EST', 
      responseTime: '< 24 hours',
      description: 'For technical implementation and configuration help'
    }
  ];

  const faqItems = [
    {
      question: 'What should I do if I think I\'ve been hacked?',
      answer: 'Immediately disconnect affected devices from the internet, do not turn them off, document everything you observe, and call our emergency hotline at 1930. Preserve evidence and avoid making changes to the system.'
    },
    {
      question: 'How do I report a phishing email?',
      answer: 'Forward the suspicious email to cybercrime.gov.in, include full headers if possible, and report it through our incident portal. Do not click any links or download attachments from the suspicious email.'
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
    },
    {
      question: 'How can I protect my personal data online?',
      answer: 'Use strong unique passwords for each account, enable two-factor authentication, keep your software updated, avoid public Wi-Fi for sensitive tasks, regularly review your privacy settings, and be cautious about sharing personal information on social media.'
    },
    {
      question: 'What is ransomware and how do I prevent it?',
      answer: 'Ransomware is malware that encrypts your files and demands payment for the decryption key. Prevent it by keeping regular backups, updating software, avoiding suspicious email attachments, using reputable antivirus software, and never paying the ransom as it does not guarantee file recovery.'
    },
    {
      question: 'How do I know if a website is safe to use?',
      answer: 'Check for HTTPS in the URL (lock icon), verify the domain spelling, look for a privacy policy, check for contact information, search for reviews online, and avoid sites that ask for unnecessary personal information. Use tools like Google Safe Browsing to verify URLs.'
    },
    {
      question: 'What should I do if my social media account is compromised?',
      answer: 'Immediately change your password from a secure device, enable two-factor authentication, review recent activity and revoke access to suspicious third-party apps, notify your contacts about the breach, and report the compromise to the platform. Check if the same password was used elsewhere and change those too.'
    }
  ];

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTicketStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '0ec500b0-f819-4bb2-8ea7-dc217a17807d',
          subject: `Support Ticket: ${ticketForm.subject}`,
          from_name: ticketForm.name,
          email: ticketForm.email,
          priority: ticketForm.priority,
          message: ticketForm.description,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setTicketStatus('success');
        setTicketSubmitted(true);
        setTicketForm({ name: '', email: '', subject: '', priority: 'low', description: '' });
      } else {
        console.error("Web3Forms API Error:", result);
        setTicketStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms submission failed:", error);
      setTicketStatus('error');
    }
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
                    {contact.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Phone:</span>
                        <a href={`tel:${contact.phone}`} className="font-mono text-sm hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    )}
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
                    {contact.phone ? (
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
                    ) : (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <a href={`mailto:${contact.email}`}>
                          <Mail className="mr-2 h-4 w-4" />
                          Email Us
                        </a>
                      </Button>
                    )}
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
                {ticketStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ticket Submitted Successfully!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your support ticket has been received. Our team will get back to you shortly.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => { setTicketSubmitted(false); setTicketStatus('idle'); }}
                      className="w-full"
                    >
                      Submit Another Ticket
                    </Button>
                  </div>
                ) : ticketStatus === 'error' ? (
                  <div className="text-center py-8">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't send your ticket. Please try again or email us directly at rakshana.mait@gmail.com.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => { setTicketSubmitted(false); setTicketStatus('idle'); }}>
                        Close
                      </Button>
                      <Button className="flex-1" onClick={() => setTicketStatus('idle')}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ticket-name">Full Name *</Label>
                        <Input id="ticket-name" value={ticketForm.name} onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ticket-email">Email Address *</Label>
                        <Input id="ticket-email" type="email" value={ticketForm.email} onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})} required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ticket-subject">Subject *</Label>
                      <Input id="ticket-subject" placeholder="Brief description of your issue" value={ticketForm.subject} onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})} required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ticket-priority">Priority Level</Label>
                      <select className="w-full p-2 border border-input rounded-md bg-background" value={ticketForm.priority} onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}>
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
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={ticketStatus === 'sending'}>
                      {ticketStatus === 'sending' ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="mr-2 h-4 w-4" /> Submit Ticket</>
                      )}
                    </Button>
                  </form>
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