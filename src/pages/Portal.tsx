// The final, complete, and merged version of src/pages/Portal.tsx

import { useState, useRef } from 'react';
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
import { Loader2, AlertTriangle, UploadCloud, Shield, Lock, File as FileIcon, X } from 'lucide-react';
import { createClient } from '@sanity/client';
import { sanityClient } from '@/lib/sanityClient';

// Sanity Client for frontend file uploads with token
const uploadClient = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_API_TOKEN,
});


const Portal = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        attackType: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, attackType: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        let evidenceFileAssetId = null;

        try {
            if (file) {
                toast.info("Uploading evidence file...");
                const asset = await uploadClient.assets.upload('file', file);
                evidenceFileAssetId = asset._id;
                toast.success("File uploaded successfully!");
            }

            const response = await fetch('/api/submit-incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, evidenceFileAssetId }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Report Submitted!", { description: "Your report has been saved." });
                setFormData({ fullName: '', emailAddress: '', attackType: '', description: '' });
                setFile(null);
            } else {
                toast.error("Submission Failed", { description: result.message || "Please try again." });
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission Failed", { description: "An error occurred." });
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fullName">Full Name *</Label>
                                                <Input id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="emailAddress">Email Address *</Label>
                                                <Input id="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} placeholder="your.email@company.com" required />
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
                                            <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Describe the incident in detail, including when it occurred, what you observed, and any actions taken..." required rows={5} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                            {!file ? (
                                                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
                                                    <UploadCloud className="h-12 w-12 text-muted-foreground mb-2" />
                                                    <p className="font-semibold">Drag & drop files or click to browse</p>
                                                    <p className="text-sm text-muted-foreground">Max 10MB • PDF, JPG, PNG, DOC accepted</p>
                                                </div>
                                            ) : (
                                                <div className="border rounded-lg p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <FileIcon className="h-6 w-6 text-primary flex-shrink-0" />
                                                        <span className="text-sm font-medium truncate">{file.name}</span>
                                                    </div>
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => setFile(null)}><X className="h-4 w-4" /></Button>
                                                </div>
                                            )}
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
                            <Card>
                                <CardHeader>
                                    <CardTitle>Your Incident Reports</CardTitle>
                                    <CardDescription>Track the status of your submitted reports</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-001</p>
                                            <p className="text-sm text-muted-foreground">Suspicious email received... • Phishing</p>
                                        </div>
                                        <Badge>In Review</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-002</p>
                                            <p className="text-sm text-muted-foreground">Detected malicious software... • Malware</p>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg border">
                                        <div>
                                            <p className="font-semibold">RPT-003</p>
                                            <p className="text-sm text-muted-foreground">Potential unauthorized access... • Data Breach</p>
                                        </div>
                                        <Badge variant="destructive">Pending</Badge>
                                    </div>
                                </CardContent>
                            </Card>

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