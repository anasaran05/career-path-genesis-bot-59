
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, User, Loader2, CheckCircle, Download, Send, Brain, Target, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PremiumModal from "@/components/PremiumModal";
import ManualApplicationModal from "@/components/ManualApplicationModal";
import { useAuth } from '@/contexts/AuthContext';

const JobApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetterUrl, setCoverLetterUrl] = useState('');
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Get job data from location state or use mock data
  const job = location.state?.job || {
    title: "Clinical Research Associate",
    company: "HealthTech Solutions",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    salary: "$65,000 - $85,000",
    match: 92,
    description: "Join our dynamic team as a Clinical Research Associate where you'll lead clinical trials and ensure regulatory compliance in groundbreaking healthcare research.",
    link: "https://example.com/job-application"
  };

  const studentData = location.state?.studentData || {};
  const generationSteps = [
    'Analyzing job requirements...',
    'Matching your healthcare profile...',
    'Generating custom resume...',
    'Creating tailored cover letter...',
    'Optimizing for ATS systems...'
  ];

  const handleGenerateDocuments = async () => {
    if (!user || !jobId) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch('/api/generateDocuments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, jobId })
      });

      if (!res.ok) {
        // Here you might want to check for a specific status code
        // for "not enough credits" and show the premium modal.
        if (res.status === 402) { // Payment Required
          setShowPremiumModal(true);
        }
        throw new Error('Failed to generate documents');
      }

      const { resumeUrl, coverLetterUrl, remainingCredits } = await res.json();
      setResumeUrl(resumeUrl);
      setCoverLetterUrl(coverLetterUrl);
      setRemainingCredits(remainingCredits);
      setGenerationComplete(true);

    } catch (error) {
      console.error(error);
      // Optionally show a toast or error message
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadResume = () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, '_blank');
  };

  const handleDownloadCoverLetter = () => {
    if (!coverLetterUrl) return;
    window.open(coverLetterUrl, '_blank');
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="bg-white/90 border-slate-200 backdrop-blur-sm max-w-md w-full mx-4 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800 mb-2">Creating Your Application</h2>
              <p className="text-slate-600">Generating tailored resume and cover letter for this healthcare position</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-navy-700">Just a moment...</p>
              <Progress value={undefined} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/job-scan" className="flex items-center space-x-2 text-slate-600 hover:text-navy-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Job Search</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-xl">Zane AI</span>
              <p className="text-slate-600 text-sm">by ZaneProEd</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!generationComplete ? (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-autumn-100 text-autumn-700 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Healthcare Job Application Setup
              </div>
              
              <h1 className="text-4xl font-bold text-navy-800 mb-4">
                Apply for {job.title}
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Let's create a tailored resume and cover letter for this healthcare position
              </p>

              {/* Job Summary */}
              <Card className="bg-white border-slate-200 shadow-lg mb-8 rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-navy-800">{job.title}</h3>
                      <p className="text-slate-600">{job.company} • {job.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={job.match} className="w-20 h-2" />
                      <span className="text-autumn-600 font-medium">{job.match}% match</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">{job.type}</Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">{job.experience}</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">{job.salary}</Badge>
                  </div>
                  
                  <p className="text-slate-700 text-left">{job.description}</p>
                </CardContent>
              </Card>

              {/* Application Process */}
              <Card className="bg-white border-slate-200 shadow-lg mb-8 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-navy-800">What We'll Create for You</CardTitle>
                  <CardDescription className="text-slate-600">
                    Our AI will generate a customized application package specifically for this healthcare role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-navy-800 font-semibold">Custom Resume</h4>
                          <p className="text-slate-600 text-sm">Tailored to match healthcare job requirements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-navy-800 font-semibold">Cover Letter</h4>
                          <p className="text-slate-600 text-sm">Personalized for this specific healthcare role</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-left">
                        <h4 className="text-navy-800 font-semibold mb-2">Key Healthcare Optimizations:</h4>
                        <ul className="text-slate-600 text-sm space-y-1">
                          <li>• ATS-optimized formatting for healthcare systems</li>
                          <li>• Clinical keyword matching from job description</li>
                          <li>• Healthcare skills and certifications highlighting</li>
                          <li>• Patient care and clinical experience alignment</li>
                          <li>• Medical industry-specific language</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                size="lg" 
                className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                onClick={handleGenerateDocuments}
              >
                Generate Application Documents
                <Target className="w-5 h-5 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                Documents Generated Successfully
              </div>
              <h1 className="text-4xl font-bold text-navy-800 mb-4">Your Application is Ready!</h1>
              {remainingCredits !== null && (
                <p className="text-xl text-slate-600 mb-8">
                  You have <span className="font-bold text-autumn-600">{remainingCredits}</span> generation credits remaining.
                </p>
              )}
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <Button size="lg" className="w-full" onClick={handleDownloadResume} disabled={!resumeUrl}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button size="lg" className="w-full" onClick={handleDownloadCoverLetter} disabled={!coverLetterUrl}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Cover Letter
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-slate-600">Next, you can either submit this application through the company's portal or explore more jobs.</p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline"
                    className="border-2 border-navy-600 text-navy-600"
                    onClick={() => job.link && window.open(job.link, '_blank')}
                    disabled={!job.link}
                  >
                    Apply on Company Site
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                  <Button onClick={() => navigate('/job-scan')}>
                    Find More Jobs
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PremiumModal open={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <ManualApplicationModal 
        open={showManualModal} 
        onClose={() => setShowManualModal(false)} 
        job={job}
      />
    </div>
  );
};

export default JobApplication;
