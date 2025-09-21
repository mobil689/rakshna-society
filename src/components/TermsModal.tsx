import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const TermsModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already accepted terms
        const hasAccepted = localStorage.getItem('termsAccepted');
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('termsAccepted', 'true');
        setIsOpen(false);
    };

    const handleDecline = () => {
        // You could redirect to an external page or show a message
        window.location.href = 'https://www.google.com';
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {}} modal>
            <DialogContent className="max-w-2xl max-h-[80vh] bg-background/95 backdrop-blur-md border-2 border-primary/20">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-primary">
                            Terms & Conditions
                        </DialogTitle>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Please review and accept our terms to continue using RAKSHNA Security Portal
                    </p>
                </DialogHeader>

                <ScrollArea className="max-h-[400px] pr-4">
                    <div className="space-y-6 text-sm leading-relaxed">
                        {/* Introduction */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-success" />
                                <span>Welcome to RAKSHNA Security Portal</span>
                            </h3>
                            <p className="text-muted-foreground">
                                By accessing and using this cybersecurity platform, you agree to comply with the following terms and conditions.
                            </p>
                        </div>

                        {/* Usage Terms */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">1. Platform Usage</h3>
                            <ul className="space-y-2 text-muted-foreground ml-4">
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>This platform is designed for legitimate cybersecurity education, incident reporting, and security awareness.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Users must provide accurate information when reporting incidents or accessing resources.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Unauthorized access attempts or malicious activities are strictly prohibited.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Privacy & Data */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">2. Privacy & Data Protection</h3>
                            <ul className="space-y-2 text-muted-foreground ml-4">
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>We collect minimal data necessary for platform functionality and security monitoring.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Incident reports and personal information are handled with strict confidentiality.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Cookies and analytics are used to improve user experience and platform security.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Responsibilities */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">3. User Responsibilities</h3>
                            <ul className="space-y-2 text-muted-foreground ml-4">
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Maintain the confidentiality of your account credentials.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Report security incidents promptly and accurately.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Respect intellectual property rights and platform resources.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Emergency Notice */}
                        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 space-y-2">
                            <div className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-warning" />
                                <h3 className="font-semibold text-warning">Emergency Notice</h3>
                            </div>
                            <p className="text-warning/80 text-xs">
                                For immediate security emergencies, call 1930 or contact your local IT support. 
                                This platform is for educational and reporting purposes only.
                            </p>
                        </div>

                        {/* Agreement */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">4. Agreement</h3>
                            <p className="text-muted-foreground">
                                By clicking "Accept", you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. 
                                If you do not agree, please decline and exit the platform.
                            </p>
                        </div>
                    </div>
                </ScrollArea>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                    <Button 
                        variant="outline" 
                        onClick={handleDecline}
                        className="flex-1 sm:flex-none"
                    >
                        Decline & Exit
                    </Button>
                    <Button 
                        onClick={handleAccept}
                        className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark"
                    >
                        Accept & Continue
                    </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2">
                    Last updated: January 2025 | RAKSHNA Security Society, MAIT
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default TermsModal;
