
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Search, MapPin, Building, Clock, Briefcase, FileText, User, Radar } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const JobScan = () => {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Note: The scanning animation is preserved for UX, but data is fetched in the background.
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('🔍 Zane AI is scanning 10,000+ listings to find your match...');
  const [showJobs, setShowJobs] = useState(false);

  const scanPhases = [
    '🔍 Zane AI is scanning 10,000+ listings to find your match...',
    '🎯 Filtering positions based on your profile...',
    '🧠 AI analyzing skill compatibility...',
    '📊 Ranking opportunities by fit score...',
    '✨ Preparing your personalized results...'
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) {
        setIsScanning(false);
        setError("You must be logged in to scan for jobs.");
        return;
      }
      
      try {
        const { data, error: rpcError } = await supabase
          .rpc('fetch_job_matches', { user_id: user.id });

        if (rpcError) throw rpcError;
        
        setJobs(data || []);
      } catch (e: any) {
        console.error("Error fetching job matches:", e);
        setError("Could not fetch job matches. Please try again later.");
      }
    };

    fetchJobs();

    // This part is for the animation and can run in parallel
    let phase = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          setIsScanning(false);
          setTimeout(() => setShowJobs(true), 500);
          clearInterval(interval);
          return 100;
        }
        
        if (newProgress > (phase + 1) * 20) {
          phase++;
          if (phase < scanPhases.length) {
            setCurrentPhase(scanPhases[phase]);
          }
        }
        
        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [user]);

  const careerPath = userProfile?.preferred_industries?.[0] || 'your field';

  const jobListings = jobs; // for minimal changes in the JSX

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 max-w-lg w-full mx-4 animate-scale-in">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              {/* Radar Animation */}
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="w-24 h-24 border-2 border-navy-200 rounded-full"></div>
                <div className="w-20 h-20 border-2 border-navy-300 rounded-full absolute top-2 left-2"></div>
                <div className="w-16 h-16 border-2 border-navy-400 rounded-full absolute top-4 left-4"></div>
                <div className="w-1 h-12 bg-navy-600 absolute top-6 left-1/2 transform -translate-x-1/2 origin-bottom animate-spin"></div>
                <Radar className="w-6 h-6 text-navy-600 absolute top-9 left-9" />
              </div>
              
              <div className="w-12 h-12 bg-gradient-to-r from-navy-600 to-navy-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Scanning Job Market</h2>
              <p className="text-navy-600">AI-powered job matching in progress...</p>
            </div>
            
            <div className="space-y-4">
              <div className="text-sm text-navy-700 mb-2">{currentPhase}</div>
              <Progress value={scanProgress} className="h-3" />
              <div className="text-xs text-navy-500">{scanProgress}% complete</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-navy-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/analysis" className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Analysis</span>
            </Link>
            <div className="text-center">
              <p className="text-sm text-navy-500">Your Smart Career Assistant — Powered by ZaneProEd</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-navy-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-navy-800 font-bold text-xl">Zane AI</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Results Summary */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4 mr-2" />
              Job Scan Complete
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-2">
              🎯 {jobListings.length} Perfect Matches Found
            </h1>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto">
              Zane AI has identified the best opportunities matching your {careerPath} background and skills
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg border-0 text-center hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-navy-800 mb-2">{jobListings.length}</div>
                <div className="text-navy-600">Total Matches</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0 text-center hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-navy-600">Best Match Score</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0 text-center hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
                <div className="text-navy-600">Top Companies</div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg border-0 text-center hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-autumn-600 mb-2">₹12L</div>
                <div className="text-navy-600">Avg Salary Range</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-navy-600" />
            Your Matched Opportunities
          </h2>
          
          <div className="space-y-6">
            {showJobs && jobListings.map((job, index) => (
              <Card key={job.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="text-4xl">{job.companyLogo}</div>
                          <div>
                            <h3 className="text-xl font-bold text-navy-900 mb-2">{job.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-navy-600 mb-2">
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                {job.company}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {job.postedDate}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge className="bg-blue-100 text-blue-700">
                                {job.type}
                              </Badge>
                              <Badge className="bg-green-100 text-green-700">
                                {job.experience}
                              </Badge>
                              <Badge className="bg-purple-100 text-purple-700">
                                {job.salary}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-2">
                            <Progress value={job.match} className="w-20 h-2 mr-2" />
                            <span className="text-sm font-semibold text-navy-800">{job.match}% match</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-navy-700 mb-4">{job.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-navy-900 font-semibold mb-2">Key Requirements:</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {job.requirements.map((req: string, idx: number) => (
                            <div key={idx} className="text-navy-600 text-sm flex items-center">
                              <div className="w-1.5 h-1.5 bg-navy-600 rounded-full mr-2 flex-shrink-0"></div>
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3 lg:ml-6 lg:w-48">
                      <Button 
                        className="bg-gradient-to-r from-autumn-500 to-autumn-600 hover:from-autumn-600 hover:to-autumn-700 text-white shadow-lg"
                        onClick={() => navigate(`/job-application/${job.id}`, { state: { job, studentData: userProfile } })}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-navy-300 text-navy-700 hover:bg-navy-50"
                        onClick={() => navigate(`/job-details/${job.id}`, { state: { job } })}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-12 py-8 border-t border-navy-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-navy-600 to-navy-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">Z</span>
              </div>
              <span className="text-navy-600 font-semibold">ZaneProEd</span>
            </div>
            <p className="text-navy-500 text-sm">Smart Career Mapping for Pharm.D & B.Pharm Graduates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobScan;
