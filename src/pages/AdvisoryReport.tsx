import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, FileText, TrendingUp, Target, Award, Book, Lightbulb, Download, Brain, Rocket, Loader2, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdvisoryReport = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the latest report if one exists
    const fetchLatestReport = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from('advisory_reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (data) {
          setReport(data);
        }
      } catch (e) {
        // No existing report is fine, so we don't set an error
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestReport();
  }, [user]);
  
  const handleGenerateReport = async () => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: functionError } = await supabase.functions.invoke('generate-advisory-report', {
        body: { userId: user.id },
      });

      if (functionError) throw functionError;
      
      setReport(data);
      toast({ title: "Success!", description: "Your new advisory report has been generated." });
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred. Please try again.");
      toast({ title: "Generation Failed", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-navy-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button onClick={() => setError(null)}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-navy-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/analysis" className="flex items-center space-x-2 text-navy-600 hover:text-navy-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Analysis</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2" />
                Advisory Report Center
              </CardTitle>
              <CardDescription>
                Generate a new AI-powered advisory report or view your latest one. 
                Generating a new report costs 10 credits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateReport} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />}
                Generate New Report
              </Button>
            </CardContent>
          </Card>

          {report ? (
            <ReportDisplay report={report.report_data} />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-semibold mb-2">No Report Found</h2>
                <p className="text-slate-600">You haven't generated an advisory report yet. Click the button above to create your first one!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const ReportDisplay = ({ report }: { report: any }) => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <CardTitle>Skill Gap Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {report.skillGaps.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Upskilling Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2">
          {report.roadmap.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {report.recommendations.map((rec: any, index: number) => (
            <div key={index} className="flex items-start">
              <Badge className="mr-4 mt-1">{rec.type}</Badge>
              <p>{rec.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdvisoryReport;
