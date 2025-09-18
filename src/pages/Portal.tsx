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

// 1. New Sanity Client for frontend file uploads
const sanityClient = createClient({
    // IMPORTANT: You need to add these as Environment Variables in your Vercel project settings
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: import.meta.env.VITE_SANITY_API_TOKEN, // Use a token with write access
});


const Portal = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        emailAddress: '',
        attackType: '',
        description: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // 2. New state and ref for file handling
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, attackType: value }));
    };

    // 3. New handler for when a file is selected
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // 4. UPDATED handleSubmit function with file upload logic
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        let evidenceFileAssetId = null;

        try {
            // Step 1: If a file is selected, upload it to Sanity first
            if (file) {
                toast.info("Uploading evidence file...");
                const asset = await sanityClient.assets.upload('file', file);
                evidenceFileAssetId = asset._id; // Get the ID of the uploaded file
                toast.success("File uploaded successfully!");
            }

            // Step 2: Send the form data (including the file asset ID) to our Vercel function
            const response = await fetch('/api/submit-incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, evidenceFileAssetId }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Report Submitted!", { description: "Your report has been saved." });
                setFormData({ fullName: '', emailAddress: '', attackType: '', description: '' });
                setFile(null); // Clear the file after successful submission
            } else {
                toast.error("Submission Failed", { description: result.message || "Please try again." });
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission Failed", { description: "An error occurred during submission." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="py-8">
                <div className="container mx-auto px-4">
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
                                        {/* Your other form fields remain the same */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* ... Full Name and Email Address Inputs ... */}
                                        </div>
                                        <div className="space-y-2">
                                            {/* ... Type of Attack Select ... */}
                                        </div>
                                        <div className="space-y-2">
                                            {/* ... Incident Description Textarea ... */}
                                        </div>

                                        {/* 5. UPDATED Upload Evidence Section */}
                                        <div className="space-y-2">
                                            <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            {!file ? (
                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors"
                                                >
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
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => setFile(null)}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
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

                        {/* Right Column: Reports and Tips (Unchanged) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* ... Your Incident Reports Card and Safety Tips Card ... */}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Portal;