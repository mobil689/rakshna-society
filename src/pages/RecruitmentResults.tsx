import React, { useState, useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trophy, CheckCircle, Star, Sparkles, Code, Shield, Terminal , Rocket } from 'lucide-react';

const RecruitmentResults = () => {
    const [showFirecrackers, setShowFirecrackers] = useState(true);
    const fireworksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!fireworksRef.current) return;

        const fireworks = new Fireworks(fireworksRef.current, {
            rocketsPoint: { min: 50, max: 50 },
            hue: { min: 0, max: 360 },
            delay: { min: 30, max: 60 },
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 90,
            flickering: 50,
            traceLength: 3,
            explosion: 5,
            mouse: { click: false, move: false, max: 1 },
            sound: { enabled: false, files: [], volume: { min: 0, max: 0 } }
        });

        fireworks.start();

        const timer = setTimeout(() => {
            fireworks.stop();
            setShowFirecrackers(false);
        }, 10000);

        return () => {
            fireworks.stop();
            clearTimeout(timer);
        };
    }, []);

    // Placeholder data - Replace with actual results
    const categories = [
        {
            id: 'tech',
            title: 'Technical Team',
            icon: Code,
            description: '',
            members: [
                { name: "Nimish Jindal", year: "2nd Year" },
                { name: "Keshav Kumar", year: "2nd Year" },
                { name: "Praneel Maitra", year: "2nd Year" },
                { name: "Harsh Vardhan Singh", year: "3rd Year" },
                { name: "Anurag Mehra", year: "3rd Year" },
                { name: "Sarthak Malik", year: "2nd Year" },
                { name: "Priyanshu Das", year: "2nd Year" },
                { name: "Sutanu Kumar Das", year: "2nd Year" },
                { name: "Madhav Gagneja", year: "2nd Year" },
                { name: "Saksham Jain", year: "2nd Year" },
                { name: "Rishabh Kaushik", year: "1st Year" },
                { name: "Jatin", year: "1st Year" },
                { name: "Prajjwal Hedaoo", year: "1st Year" },
                { name: "Abhiraj Mishra", year: "2nd Year" },
            ]
        },
        {
            id: 'non-tech',
            title: 'Non Technical Team',
            icon: Rocket,
            description: '',
            members: [
                { name: "Anshul Singh Negi", year: "3rd Year" },
                { name: "Rishabh Kaushik", year: "1st Year" },
                { name: "Manav Garg", year: "2nd Year" },
                { name: "Kartik Sharma", year: "1st Year" },
                { name: "Muskan Bhardwaj", year: "2nd Year" },
                { name: "Rishabh Raj", year: "2nd Year" },
                { name: "Prateek Tanwar", year: "2nd Year" },
                { name: "Sahib Singh Sodhi", year: "2nd Year" },
                { name: "Ashmita Khanal", year: "2nd Year" },
                { name: "Varun Kumar", year: "2nd Year" },
                { name: "Keshav Garg", year: "1st Year" },
                { name: "Devanshi Verma", year: "2nd Year" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
            {showFirecrackers && (
                <div 
                    ref={fireworksRef}
                    className="fixed inset-0 pointer-events-none z-[100] overflow-hidden"
                    style={{ background: 'transparent' }}
                />
            )}
            <Header />
            
            <main className="relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 py-16 md:py-24">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="outline" className="px-4 py-1 text-base mb-4 border-primary/50 text-primary bg-primary/5 backdrop-blur-sm">
                                Announcement
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary-foreground pb-2">
                                Recruitment Results 2026
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                We are thrilled to welcome these exceptional talents to the Rakshna Society family. 
                                The selection process was rigorous, and your skills truly stood out.
                            </p>
                        </motion.div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {categories.map((category, idx) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Card className="h-full border-primary/10 bg-card/40 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group overflow-hidden relative border-t-primary/20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    
                                    <CardHeader className="pb-6 relative z-10">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                                                <category.icon className="w-6 h-6" />
                                            </div>
                                            <CardTitle className="text-2xl font-bold tracking-tight">{category.title}</CardTitle>
                                        </div>
                                        {category.description && <p className="text-sm text-muted-foreground ml-1">{category.description}</p>}
                                    </CardHeader>
                                    
                                    <CardContent className="relative z-10">
                                        <div className="grid gap-3">
                                            {category.members.map((member, mIdx) => (
                                                <motion.div 
                                                    key={mIdx}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + (mIdx * 0.05) }}
                                                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/40 hover:bg-secondary/80 border border-transparent hover:border-primary/20 transition-all group/item backdrop-blur-sm"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-2 w-2 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                                                        <h4 className="font-semibold text-base group-hover/item:text-primary transition-colors">{member.name}</h4>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-background/50 text-[11px] font-medium text-muted-foreground border-primary/10">
                                                        {member.year}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-center mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
                    >
                        <Trophy className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Congratulations to Everyone!</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            To those who didn't make it this time – don't be discouraged. Your enthusiasm was inspiring, 
                            and we encourage you to keep learning and apply again in our next drive.
                        </p>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RecruitmentResults;
