import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Shield, Clock, CheckSquare, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const IncidentResponse = () => {
  const responseSteps = [
    {
      step: 1,
      title: 'Immediate Containment',
      description: 'Isolate affected systems and prevent further damage',
      actions: [
        'Disconnect compromised devices from network',
        'Preserve evidence and system state',
        'Document initial observations',
        'Notify IT security team immediately'
      ]
    },
    {
      step: 2,
      title: 'Assessment & Analysis',
      description: 'Evaluate the scope and impact of the incident',
      actions: [
        'Identify affected systems and data',
        'Determine attack vector and timeline',
        'Assess business impact and risks',
        'Collect and preserve digital evidence'
      ]
    },
    {
      step: 3,
      title: 'Eradication & Recovery',
      description: 'Remove threats and restore normal operations',
      actions: [
        'Remove malware and close vulnerabilities',
        'Update security controls and patches',
        'Restore systems from clean backups',
        'Monitor for signs of persistent threats'
      ]
    },
    {
      step: 4,
      title: 'Post-Incident Review',
      description: 'Learn from the incident and improve defenses',
      actions: [
        'Document lessons learned',
        'Update incident response procedures',
        'Implement additional security measures',
        'Conduct staff training if needed'
      ]
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
              <Shield className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Cyber Incident Response</h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Follow our comprehensive incident response framework to effectively handle and recover from cybersecurity incidents
              </p>
            </div>
          </div>

          {/* Emergency Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-destructive bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Response
                </CardTitle>
                <CardDescription>Immediate actions for active incidents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium text-sm">If you are currently under attack:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Disconnect affected systems immediately</li>
                    <li>• Do not power off devices (preserve evidence)</li>
                    <li>• Contact emergency helpline</li>
                    <li>• Document everything you observe</li>
                  </ul>
                </div>
                <Button variant="destructive" className="w-full" asChild>
                  <Link to="/portal">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Incident Now
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
                <CardDescription>24/7 incident response support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Emergency Hotline:</span>
                    <span className="font-mono">+1-800-CYBER-911</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Email Support:</span>
                    <span className="text-sm">incident@cybersecure.gov</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Response Time:</span>
                    <span className="text-sm">&lt; 15 minutes</span>
                  </div>
                </div>
                <Button variant="default" className="w-full" asChild>
                  <Link to="/helpline">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Expert Now
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Response Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">
              4-Step Incident Response Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {responseSteps.map((step, index) => (
                <Card key={step.step} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm">
                          <CheckSquare className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Additional Resources
              </CardTitle>
              <CardDescription>Detailed guides and documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4" asChild>
                  <Link to="/guidelines">
                    <div className="text-center">
                      <FileText className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Response Guidelines</div>
                      <div className="text-xs text-muted-foreground">Detailed procedures</div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="h-auto p-4" asChild>
                  <Link to="/training">
                    <div className="text-center">
                      <Shield className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Training Materials</div>
                      <div className="text-xs text-muted-foreground">Educational resources</div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="h-auto p-4" asChild>
                  <a href="mailto:incident@cybersecure.gov">
                    <div className="text-center">
                      <Phone className="h-6 w-6 mx-auto mb-2" />
                      <div className="font-medium">Expert Consultation</div>
                      <div className="text-xs text-muted-foreground">Direct assistance</div>
                    </div>
                  </a>
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

export default IncidentResponse;