import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Download, Brain, Sparkles, User } from 'lucide-react';

const Dashboard = () => {
    const { user, userProfile, signOut } = useAuth();
    const [credits, setCredits] = useState<number | null>(null);
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const { data: profile, error: profileError } = await supabase
                    .from('user_profiles')
                    .select('credits')
                    .eq('id', user.id)
                    .single();
                
                if (profileError) throw profileError;
                setCredits(profile.credits);

                const { data: docs, error: docsError } = await supabase
                    .from('generated_documents')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('generated_at', { ascending: false });

                if (docsError) throw docsError;
                setDocs(docs || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p>Loading your dashboard...</p>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <p className="mb-4">Please log in to see your dashboard.</p>
                <Link to="/">
                    <Button>Go to Home</Button>
                </Link>
            </div>
        );
    }

    const userName = userProfile?.name?.split(' ')[0] || 'User';

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
                        <Button variant="outline" onClick={signOut} className="border-2 border-slate-200 text-navy-700 hover:bg-navy-50 rounded-xl">
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
                            <p className="text-3xl font-bold text-navy-700">{credits === null ? '-' : credits}</p>
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
                                                <p className="font-semibold capitalize">{doc.type}</p>
                                                <p className="text-sm text-slate-500">
                                                    Generated on {new Date(doc.generated_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm">
                                                <Download className="w-4 h-4 mr-2"/>
                                                Download
                                            </Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>You haven't generated any documents yet.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Dashboard; 