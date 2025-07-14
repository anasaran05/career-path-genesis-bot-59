
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Brain, TrendingUp, Users, Briefcase, Star, CheckCircle, Loader2 
} from "lucide-react";
import { supabase } from '@/lib/supabase';

const Analysis = () => {
  const { userId } = useParams<{ userId: string }>();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runAndFetchAnalysis = async () => {
      if (!userId) {
        setLoading(false);
        setError("No user ID provided.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // 1. Trigger the analysis process
        const res = await fetch('/api/analyzeProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });

        if (!res.ok) {
          throw new Error('Failed to start analysis. Please try again later.');
        }
        await res.json(); // Wait for the analysis to be confirmed as started

        // 2. Fetch the results from Supabase
        const { data, error: dbError } = await supabase
          .from('analysis_results')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (dbError) {
          throw dbError;
        }
        
        setAnalysis(data);
      } catch (e: any) {
        console.error("Error fetching analysis:", e);
        setError(e.message || "An unexpected error occurred while fetching your analysis.");
      } finally {
        setLoading(false);
      }
    };

    runAndFetchAnalysis();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-navy-600 animate-spin mb-4" />
        <p className="text-navy-700 font-medium text-lg">Zane AI is analyzing your profile...</p>
        <p className="text-slate-500">This may take a moment.</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 mb-4">{error || "No analysis data found. Please complete the intake form first."}</p>
            <Link to="/intake">
              <Button>Go to Intake Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userName = analysis.user_name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/intake" className="flex items-center space-x-2 text-navy-600 hover:text-navy-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Intake</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-navy-600 to-autumn-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-navy-700 font-bold text-lg">Zane AI</span>
              <p className="text-slate-500 text-xs">Career Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-navy-800 mb-2">Hi {userName}! 👋</h1>
            <p className="text-xl text-slate-600">Here's your personalized career analysis for <span className="font-semibold text-navy-700">{analysis.industry_name}</span></p>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800">Recommended Career Paths</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {analysis.recommended_careers?.map((career: any, index: number) => (
                <Card key={index} className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold text-navy-800">{career.title}</CardTitle>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                        <Star className="w-3 h-3" />
                        <span>{career.match_score}%</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{career.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Match Score</span>
                        <span className="font-medium text-navy-700">{career.match_score}%</span>
                      </div>
                      <Progress value={career.match_score} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Salary</p>
                        <p className="text-sm font-semibold text-navy-700">{career.salary_range}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Growth</p>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          career.growth_prospects === 'High' ? 'bg-green-100 text-green-700' :
                          career.growth_prospects === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {career.growth_prospects}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Key Skills to Upskill</p>
                      <div className="flex flex-wrap gap-2">
                        {career.required_skills?.map((skill: string, skillIndex: number) => (
                          <span key={skillIndex} className="bg-navy-100 text-navy-700 px-2 py-1 rounded-md text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-navy-50 to-blue-50 border border-navy-200 shadow-lg animate-fade-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-navy-500 to-autumn-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-navy-800">Priority Skills for This Industry</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-6">High-value skills essential for success in {analysis.industry_name}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {analysis.priority_skills?.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-navy-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link to="/job-scan">
              <Button className="bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Find Matching Jobs
                <Users className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
