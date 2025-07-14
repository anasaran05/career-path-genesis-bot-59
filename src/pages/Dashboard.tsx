
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Download, Brain, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthModal from '@/components/AuthModal';

const Dashboard = () => {
    const { user, userProfile, signOut } = useAuth();
    const [totalCredits, setTotalCredits] = useState<number | null>(null);
    const [usedCredits, setUsedCredits] = useState<number | null>(null);
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                navigate('/auth');
                return;
            }

            console.log('Fetching dashboard data for user:', user.id);
            setLoading(true);

            try {
                // Fetch credits
                const { data: creditsData, error: creditsError } = await supabase
                    .from('user_credits')
                    .select('total_credits, used_credits')
                    .eq('user_id', user.id)
                    .single();
                
                console.log('Credits query result:', { creditsData, creditsError });
                
                if (creditsError) {
                    console.error('Error fetching credits:', creditsError);
                    toast({
                        title: "Error",
                        description: "Failed to load credits. Please try refreshing the page.",
                        variant: "destructive",
                    });
                } else {
                    setTotalCredits(creditsData?.total_credits ?? 30);
                    setUsedCredits(creditsData?.used_credits ?? 0);
                }

                // Fetch documents
                const { data: docs, error: docsError } = await supabase
                    .from('generated_documents')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                console.log('Documents query result:', { docs, docsError });

                if (docsError) {
                    console.error('Error fetching documents:', docsError);
                    toast({
                        title: "Error",
                        description: "Failed to load documents. Please try refreshing the page.",
                        variant: "destructive",
                    });
                } else {
                    setDocs(docs || []);
                }
            } catch (error) {
                console.error('Dashboard error:', error);
                toast({
                    title: "Error",
                    description: "Something went wrong. Please try refreshing the page.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate, toast]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mx-auto mb-4"></div>
                    <p className="text-navy-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <p className="mb-4 text-navy-700">Please log in to see your dashboard.</p>
                <Button onClick={() => setIsAuthModalOpen(true)}>Log In</Button>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </div>
        );
    }

    const userName = userProfile?.name?.split(' ')[0] || user.email?.split('@')[0] || 'User';
    const availableCredits = totalCredits !== null && usedCredits !== null ? totalCredits - usedCredits : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Brain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className="text-navy-700 font-bold text-xl">Zane AI</span>
                                <p className="text-slate-600 text-sm">Student Dashboard</p>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-navy-700 font-medium">
                            Welcome, {userName}
                        </span>
                        <Button 
                            variant="outline" 
                            onClick={async () => {
                                await signOut();
                                navigate('/');
                            }} 
                            className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl"
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-navy-800">Your Dashboard</h1>
                    <p className="text-slate-600">Track your career progress and generated assets.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Sparkles className="w-5 h-5 text-autumn-500"/>
                                <span>AI Credits</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-navy-700">{availableCredits === null ? '-' : availableCredits}</p>
                            <p className="text-slate-500">Document generation credits remaining.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-2">
                            <Link to="/intake">
                                <Button className="w-full" variant="outline">Update Your Profile</Button>
                            </Link>
                             <Link to="/job-scan">
                                <Button className="w-full">Find Matching Jobs</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Generated Documents</CardTitle>
                        <CardDescription>Your history of generated resumes and cover letters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {docs.length > 0 ? (
                            <div className="space-y-4">
                                {docs.map(doc => (
                                    <div key={doc.id} className="flex justify-between items-center p-4 border rounded-lg bg-white">
                                        <div className="flex items-center space-x-4">
                                            <FileText className="w-6 h-6 text-navy-600"/>
                                            <div>
                                                <p className="font-semibold capitalize">{doc.type || 'Document'}</p>
                                                <p className="text-sm text-slate-500">
                                                    Generated on {new Date(doc.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            {doc.resume_url && (
                                                <a href={doc.resume_url} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="outline" size="sm">
                                                        <Download className="w-4 h-4 mr-2"/>
                                                        Resume
                                                    </Button>
                                                </a>
                                            )}
                                            {doc.cover_letter_url && (
                                                <a href={doc.cover_letter_url} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="outline" size="sm">
                                                        <Download className="w-4 h-4 mr-2"/>
                                                        Cover Letter
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-slate-500">You haven't generated any documents yet.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard;
