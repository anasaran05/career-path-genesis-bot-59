import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Brain, TrendingUp, Users, Briefcase, Star, CheckCircle, 
  Loader2, GraduationCap, DollarSign, Lock, FileText, AlertTriangle
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Analysis = () => {
  const { industry } = useParams<{ industry: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [analysis, setAnalysis] = useState<{ immediateRoles: any[], futureRoles: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (user && industry) {
      const fetchAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const { data, error: functionError } = await supabase.functions.invoke('analyze-career-path', {
            body: { userId: user.id, industry },
          });

          if (functionError) throw functionError;
          setAnalysis(data);
        } catch (e: any) {
          setError(e.message || 'Failed to fetch analysis.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchAnalysis();
    }
  }, [user, industry]);

  const handleJobScanClick = async () => {
    if (!user) return;
    
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('certifications, projects')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      setError("Could not retrieve your profile to check for job scan readiness.");
      return;
    }
    
    const hasCerts = profile.certifications && profile.certifications.length > 0;
    const hasProjects = profile.projects && profile.projects.length > 0;

    if (!hasCerts || !hasProjects) {
      setShowWarning(true);
    } else {
      navigate('/job-scan');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-navy-600 animate-spin mb-4" />
        <p className="text-navy-700 font-medium text-lg">Analyzing your profile against career paths...</p>
        <p className="text-slate-500">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 mb-4">{error}</p>
            <Link to="/intake">
              <Button>Return to Intake Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 mb-4">No analysis data found. Please complete the intake form first.</p>
            <Link to="/intake">
              <Button>Go to Intake Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/intake" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake Form</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button onClick={() => navigate('/advisory-report')} className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Get Advisory Report
            </Button>
            <Button variant="outline" onClick={handleJobScanClick} className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Start Job Scan
            </Button>
          </div>

          {/* Immediate Roles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-700 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              Immediate Job Roles
            </h2>
            <div className="space-y-4">
              {analysis.immediateRoles.map((path: any) => (
                <RoleCard key={path.id} path={path} />
              ))}
            </div>
          </div>

          {/* Future Roles */}
          <div>
            <h2 className="text-2xl font-bold text-navy-700 mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2 text-slate-500" />
              Future Roles
            </h2>
            <div className="space-y-4">
              {analysis.futureRoles.map((path: any) => (
                <RoleCard key={path.id} path={path} locked />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Warning Dialog */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 text-amber-500" />
              Profile Incomplete
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your profile is missing key information like certifications or projects. 
              For the best job scan results, we recommend completing your profile first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate('/job-scan')}>
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const RoleCard = ({ path, locked = false }: { path: any, locked?: boolean }) => (
  <Card className={`transition-all duration-300 ${locked ? 'bg-slate-50 opacity-70' : 'hover:border-autumn-200'}`}>
    <CardContent className="p-6">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        <div>
          <h3 className={`text-xl font-bold ${locked ? 'text-slate-500' : 'text-navy-700'}`}>{path.role_title}</h3>
          <p className="text-slate-500">{path.role_level}</p>
        </div>
        <div>
          <div className="space-y-2">
            <p className="flex items-center text-slate-600">
              <DollarSign className="w-4 h-4 mr-2" />
              ${path.min_salary} - ${path.max_salary}
            </p>
            <p className="flex items-center text-slate-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              {path.growth_rate}% Growth
            </p>
          </div>
        </div>
        <div>
          <div className="mb-2">
            <div className="flex items-center space-x-2">
              <Progress value={path.skillMatchPercentage} className="flex-1" />
              <span className="text-navy-700 font-bold">{Math.round(path.skillMatchPercentage)}%</span>
            </div>
            <p className="text-xs text-slate-500 text-center mt-1">Skill Match</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {path.required_skills.slice(0, 3).map((skill: string) => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Analysis;
