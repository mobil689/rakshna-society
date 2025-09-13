import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Upload, Clock, CheckCircle, XCircle, Shield, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Portal = () => {
  const [reports, setReports] = useState([
    { id: 'RPT-001', type: 'Phishing', status: 'In Review', date: '2025-09-10', description: 'Suspicious email received...' },
    { id: 'RPT-002', type: 'Malware', status: 'Resolved', date: '2025-09-12', description: 'Detected malicious software...' },
    { id: 'RPT-003', type: 'Data Breach', status: 'Pending', date: '2025-09-12', description: 'Potential unauthorized access...' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'In Review': return <AlertTriangle className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-warning';
      case 'In Review': return 'bg-primary';
      case 'Resolved': return 'bg-success';
      default: return 'bg-destructive';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Cyber Attack Reporting Portal</h1>
            <p className="text-muted-foreground">Report security incidents and track their resolution status</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Incident Report Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Report New Incident
                </CardTitle>
                <CardDescription>
                  Provide detailed information about the security incident
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@company.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attack-type">Type of Attack *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select attack type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phishing">Phishing</SelectItem>
                      <SelectItem value="malware">Malware</SelectItem>
                      <SelectItem value="ransomware">Ransomware</SelectItem>
                      <SelectItem value="data-breach">Data Breach</SelectItem>
                      <SelectItem value="ddos">DDoS Attack</SelectItem>
                      <SelectItem value="social-engineering">Social Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Incident Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the incident in detail, including when it occurred, what you observed, and any actions taken..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop files or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Max 10MB • PDF, JPG, PNG, DOC accepted
                    </p>
                    <Input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  <Shield className="mr-2 h-4 w-4" />
                  Submit Incident Report
                </Button>
              </CardContent>
            </Card>

            {/* Status Tracker & Safety Tips */}
            <div className="space-y-6">
              
              {/* Status Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Incident Reports</CardTitle>
                  <CardDescription>Track the status of your submitted reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{report.id}</span>
                            <Badge className={`${getStatusColor(report.status)} text-white`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(report.status)}
                                {report.status}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{report.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{report.type} • {report.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Immediate Safety Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="bg-primary/10 p-2 rounded-full w-fit h-fit">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Isolate Affected Systems</h4>
                        <p className="text-xs text-muted-foreground">Disconnect compromised devices from the network immediately</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-primary/10 p-2 rounded-full w-fit h-fit">
                        <AlertTriangle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Do Not Pay Ransoms</h4>
                        <p className="text-xs text-muted-foreground">Contact authorities before making any payments to attackers</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-primary/10 p-2 rounded-full w-fit h-fit">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Emergency Contact</h4>
                        <p className="text-xs text-muted-foreground">Call 1930 for immediate assistance</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Emergency Helpline
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portal;