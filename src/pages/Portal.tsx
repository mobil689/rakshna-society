// The new, complete version of src/pages/Portal.tsx

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { Loader2, AlertTriangle, UploadCloud, Shield, Lock } from 'lucide-react';

const Portal = () => {
    // All this logic for form handling is the same
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        attackType: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, attackType: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/submit-incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Report Submitted!", {
                    description: "Your incident report has been saved successfully.",
                });
                setFormData({ fullName: '', emailAddress: '', attackType: '', description: '' });
            } else {
                toast.error("Submission Failed", { description: result.message || "Please try again later." });
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            toast.error("Submission Failed", { description: "An error occurred while submitting your report." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="container mx-auto px-4">
                    {/* Main two-column grid layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                        {/* Left Column: The Form */}
                        <div className="lg:col-span-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        <AlertTriangle className="h-6 w-6 text-primary" />
                                        Report New Incident
                                    </CardTitle>
                                    <CardDescription>
                                        Provide detailed information about the security incident.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Form fields are the same as before */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">Full Name *</Label>
                                                <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="emailAddress">Email Address *</Label>
                                                <Input id="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="attackType">Type of Attack *</Label>
                                            <Select onValueChange={handleSelectChange} value={formData.attackType} required>
                                                <SelectTrigger id="attackType"><SelectValue placeholder="Select attack type" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Phishing">Phishing</SelectItem>
                                                    <SelectItem value="Malware/Ransomware">Malware / Ransomware</SelectItem>
                                                    <SelectItem value="Data Breach">Data Breach</SelectItem>
                                                    <SelectItem value="Cyberbullying/Harassment">Cyberbullying / Harassment</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Incident Description *</Label>
                                            <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the incident in detail..." required rows={5} />
                                        </div>

                                        {/* Restored Upload Evidence Section */}
                                        <div className="space-y-2">
                                            <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center">
                                                <UploadCloud className="h-12 w-12 text-muted-foreground mb-2" />
                                                <p className="font-semibold">Drag & drop files or click to browse</p>
                                                <p className="text-sm text-muted-foreground">Max 10MB • PDF, JPG, PNG, DOC accepted</p>
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : 'Submit Incident Report'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column: Reports and Tips */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Your Incident Reports Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Incident Reports</CardTitle>
                                    <CardDescription>Track the status of your submitted reports</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* This is placeholder data for now */}
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-001</p>
                                            <p className="text-sm text-muted-foreground">Suspicious email received... • Phishing</p>
                                        </div>
                                        <Badge variant="default">In Review</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-002</p>
                                            <p className="text-sm text-muted-foreground">Detected malicious software... • Malware</p>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-500 text-white">Resolved</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-003</p>
                                            <p className="text-sm text-muted-foreground">Potential unauthorized access... • Data Breach</p>
                                        </div>
                                        <Badge variant="destructive" className="bg-orange-500 text-white">Pending</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Immediate Safety Tips Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Immediate Safety Tips</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-primary mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Isolate Affected Systems</h4>
                                            <p className="text-sm text-muted-foreground">Disconnect compromised devices from the network immediately.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Lock className="h-5 w-5 text-destructive mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Do Not Pay Ransoms</h4>
                                            <p className="text-sm text-muted-foreground">Contact authorities before making any payments to attackers.</p>
                                        </div>
                                    </div>
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