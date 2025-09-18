// The final version of src/pages/Portal.tsx

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Loader2, AlertTriangle } from 'lucide-react';

const Portal = () => {
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
            // THIS IS THE ONLY LINE THAT CHANGES!
            // We now point to our new Vercel Function endpoint.
            const response = await fetch('/api/submit-incident', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Report Submitted!", {
                    description: "Your incident report has been saved successfully.",
                });
                setFormData({ fullName: '', emailAddress: '', attackType: '', description: '' });
            } else {
                toast.error("Submission Failed", {
                    description: result.message || "Please try again later.",
                });
            }
        } catch (error) {
            console.error("Failed to fetch:", error);
            toast.error("Submission Failed", {
                description: "An error occurred while submitting your report.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto">
                        <CardHeader className="text-center">
                            <AlertTriangle className="h-12 w-12 mx-auto text-primary" />
                            <CardTitle className="text-3xl">Incident Reporting Portal</CardTitle>
                            <CardDescription>
                                If you are a victim of a cybercrime, please provide the details below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" value={formData.fullName} onChange={handleChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emailAddress">Email Address</Label>
                                        <Input id="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="attackType">Type of Attack</Label>
                                    <Select onValueChange={handleSelectChange} value={formData.attackType} required>
                                        <SelectTrigger id="attackType">
                                            <SelectValue placeholder="Select the type of incident..." />
                                        </SelectTrigger>
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
                                    <Label htmlFor="description">Incident Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Describe the incident in detail..."
                                        required
                                        rows={6}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                                    ) : ( 'Submit Incident Report' )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Portal;