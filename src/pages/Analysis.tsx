
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Brain, TrendingUp, Users, Briefcase, Star, CheckCircle, 
  Loader2, GraduationCap, DollarSign, TrendingDown 
} from "lucide-react";
import { useCareerPaths, CareerPath } from '@/hooks/use-career-paths';

const Analysis = () => {
  const { industry } = useParams<{ industry: string }>();
  const { data, isLoading, error } = useCareerPaths(industry);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-navy-600 animate-spin mb-4" />
        <p className="text-navy-700 font-medium text-lg">Analyzing career paths...</p>
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

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <p className="text-slate-600 mb-4">No career path data found. Please complete the intake form first.</p>
            <Link to="/intake">
              <Button>Go to Intake Form</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { careerPaths, topMatch } = data;

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
          {/* Top Match Section */}
          <Card className="mb-8 border-2 border-autumn-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-autumn-500" />
                <span>Best Career Match</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-navy-700 mb-2">{topMatch.role_title}</h3>
                  <div className="space-y-2">
                    <p className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-2" />
                      {topMatch.role_level}
                    </p>
                    <p className="flex items-center text-slate-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {topMatch.salaryRange}
                    </p>
                    <p className="flex items-center text-slate-600">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {topMatch.growthIndicator}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-slate-600 mb-2">Match Score</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={topMatch.matchScore} className="flex-1" />
                      <span className="text-navy-700 font-bold">{topMatch.matchScore}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{topMatch.job_outlook}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Career Paths */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy-700">Other Career Paths</h2>
            {careerPaths.slice(1).map((path: CareerPath) => (
              <Card key={path.id} className="hover:border-autumn-200 transition-colors">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-navy-700 mb-2">{path.role_title}</h3>
                      <p className="text-slate-600">{path.role_level}</p>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <p className="flex items-center text-slate-600">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {path.salaryRange}
                        </p>
                        <p className="flex items-center text-slate-600">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {path.growthIndicator}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <div className="flex items-center space-x-2">
                          <Progress value={path.matchScore} className="flex-1" />
                          <span className="text-navy-700 font-bold">{path.matchScore}%</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {path.required_skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
